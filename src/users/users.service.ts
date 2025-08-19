import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeMainCategoryDto } from './dto/change-main-category.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['establishments'],
      select: ['id', 'email', 'taxId', 'shortName', 'fullName', 'payerAddress', 'role', 'mainCategory', 'createdAt'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateProfileDto);
    return this.userRepository.save(user);
  }

  async changeMainCategory(userId: string, changeMainCategoryDto: ChangeMainCategoryDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.mainCategory = changeMainCategoryDto.mainCategory;
    await this.userRepository.save(user);

    return { 
      message: 'Main category updated successfully',
      mainCategory: user.mainCategory 
    };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;
    await this.userRepository.save(user);

    return { message: 'Password changed successfully' };
  }

  async changeEmail(userId: string, newEmail: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if email is already taken
    const existingUser = await this.userRepository.findOne({ where: { email: newEmail } });
    if (existingUser && existingUser.id !== userId) {
      throw new BadRequestException('Email is already taken');
    }

    user.email = newEmail;
    user.isEmailVerified = false;
    user.emailVerificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    
    await this.userRepository.save(user);

    return { 
      message: 'Email changed successfully. Please verify your new email.',
      verificationCode: user.emailVerificationCode 
    };
  }

  async deleteAccount(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
    return { message: 'Account deleted successfully' };
  }
} 