import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IManagerDetails, IPlace, IRegisterData, IUnpResponse } from '../../shared/interfaces/auth.interface';

export class UnpResponseDto implements IUnpResponse {
  @ApiProperty()
  @IsString()
  ckodsost: string;

  @ApiProperty({ type: 'null', required: false })
  @IsOptional()
  dlikv: null;

  @ApiProperty()
  @IsString()
  dreg: string;

  @ApiProperty()
  @IsString()
  nmns: string;

  @ApiProperty()
  @IsString()
  vkods: string;

  @ApiProperty({ type: 'null', required: false })
  @IsOptional()
  vlikv: null;

  @ApiProperty()
  @IsString()
  vmns: string;

  @ApiProperty()
  @IsString()
  vnaimk: string;

  @ApiProperty()
  @IsString()
  vnaimp: string;

  @ApiProperty()
  @IsString()
  vpadres: string;

  @ApiProperty()
  @IsString()
  vunp: string;
}

export class PlaceDto implements IPlace {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  type: string[];
}

export class ManagerDetailsDto implements IManagerDetails {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty()
  @IsString()
  phone: string;
}

export class RegisterDto implements IRegisterData {
  // @ApiProperty()
  // @IsObject()
  // @ValidateNested()
  // @Type(() => UnpResponseDto)
  // unpData: UnpResponseDto;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsBoolean()
  isCustomer: boolean;

  @ApiProperty()
  @IsString()
  unp: string;

  // @ApiProperty({ type: [PlaceDto] })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => PlaceDto)
  // places: PlaceDto[];

  // @ApiProperty()
  // @IsObject()
  // @ValidateNested()
  // @Type(() => ManagerDetailsDto)
  // managerDetails: ManagerDetailsDto;
} 