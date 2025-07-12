import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  IsArray,
  IsBoolean,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IFilter } from '../../shared/interfaces/category.interface';
import { Type } from 'class-transformer';

class SubcategoryDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Premium Coffee Beans' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'High quality arabica coffee beans', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ example: 25.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SubcategoryDto)
  subcategory?: SubcategoryDto;

  @ApiProperty({ type: [Object], required: false })
  @IsOptional()
  @IsArray()
  filters?: IFilter[];

  @ApiProperty({ example: 'gr', required: false })
  @IsOptional()
  @IsString()
  measure?: 'ml' | 'gr';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  specialConditions?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  volume?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  giftBox?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certificates?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isManufacturer?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  abv?: number;
} 