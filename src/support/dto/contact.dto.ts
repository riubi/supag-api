import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Question about products' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'I have a question about your platform...' })
  @IsString()
  @IsNotEmpty()
  message: string;
} 