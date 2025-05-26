import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Premium Coffee Beans' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'High quality arabica coffee beans', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 25.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 'Arabica', required: false })
  @IsOptional()
  @IsString()
  subCategory?: string;

  @ApiProperty({ example: { origin: 'Colombia', roast: 'Medium' }, required: false })
  @IsOptional()
  attributes?: Record<string, any>;
} 