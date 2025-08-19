import { Controller, Get, Put, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeMainCategoryDto } from './dto/change-main-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @Put('profile/change-main-category')
  @ApiOperation({ summary: 'Change main category' })
  @ApiResponse({ status: 200, description: 'Main category changed successfully' })
  async changeMainCategory(@Request() req, @Body() changeMainCategoryDto: ChangeMainCategoryDto) {
    return this.usersService.changeMainCategory(req.user.id, changeMainCategoryDto);
  }

  @Put('change-password')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(req.user.id, changePasswordDto);
  }

  @Put('change-email')
  @ApiOperation({ summary: 'Change email' })
  @ApiResponse({ status: 200, description: 'Email changed successfully' })
  async changeEmail(@Request() req, @Body('email') email: string) {
    return this.usersService.changeEmail(req.user.id, email);
  }

  @Delete('account')
  @ApiOperation({ summary: 'Delete account' })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  async deleteAccount(@Request() req) {
    return this.usersService.deleteAccount(req.user.id);
  }
} 