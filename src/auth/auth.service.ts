import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../users/entities/user.entity';
import { Establishment } from '../establishments/entities/establishment.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private externalApiService: ExternalApiService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const user = await this.userRepository.findOne({ 
      where: { email },
      relations: ['establishments']
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        taxId: user.taxId,
        shortName: user.shortName,
        fullName: user.fullName,
        establishments: user.establishments,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, isCustomer, places, managerDetails, unpData } = registerDto;
    const taxId = unpData.vkods;
    const role = isCustomer ? UserRole.CUSTOMER : UserRole.SUPPLIER;
    const establishments = places.map(place => ({
      name: place.name,
      address: place.address,
      type: place.type,
    }));

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email }
    });

    if (existingUser) {
      throw new ConflictException('User with this email or tax ID already exists');
    }

    // Validate tax ID with external API
    const taxValidation = await this.externalApiService.validateTaxId(taxId);
    if (!taxValidation.valid) {
      throw new BadRequestException('Invalid tax ID');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate email verification code
    const emailVerificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      taxId,
      role,
      emailVerificationCode,
      shortName: taxValidation.shortName,
      fullName: taxValidation.fullName,
      payerAddress: taxValidation.address,
    });

    const savedUser = await this.userRepository.save(user);

    // Create establishments for customers
    if (role === UserRole.CUSTOMER && establishments?.length) {
      const establishmentEntities = establishments.map(est => 
        this.establishmentRepository.create({
          ...est,
          userId: savedUser.id,
        })
      );
      await this.establishmentRepository.save(establishmentEntities);
    }

    // Send verification email
    await this.sendVerificationEmail(savedUser.email, emailVerificationCode);

    return {
      message: 'Registration successful. Please check your email for verification code.',
      userId: savedUser.id,
    };
  }

  async verifyEmail(userId: string, code: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user || user.emailVerificationCode !== code) {
      throw new BadRequestException('Invalid verification code');
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = null;
    await this.userRepository.save(user);

    return { message: 'Email verified successfully' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if email exists
      return { message: 'If email exists, reset instructions have been sent' };
    }

    const resetToken = this.jwtService.sign(
      { sub: user.id, type: 'reset' },
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await this.userRepository.save(user);

    await this.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'If email exists, reset instructions have been sent' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ 
        where: { 
          id: decoded.sub,
          resetPasswordToken: token,
        }
      });

      if (!user || user.resetPasswordExpires < new Date()) {
        throw new BadRequestException('Invalid or expired reset token');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await this.userRepository.save(user);

      return { message: 'Password reset successfully' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }

  private async sendVerificationEmail(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification - Supag',
      template: 'verification',
      context: {
        code,
      },
    });
  }

  private async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset - Supag',
      template: 'password-reset',
      context: {
        resetUrl,
      },
    });
  }
} 