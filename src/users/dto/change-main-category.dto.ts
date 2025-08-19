import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeMainCategoryDto {
  @ApiProperty({ 
    description: 'Main category value',
    example: 'products',
    required: true 
  })
  @IsNotEmpty()
  @IsString()
  mainCategory: string;
}
