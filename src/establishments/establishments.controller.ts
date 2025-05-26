import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Establishments')
@Controller('establishments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CUSTOMER)
@ApiBearerAuth()
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create establishment (Customer only)' })
  @ApiResponse({ status: 201, description: 'Establishment created successfully' })
  async create(@Body() createEstablishmentDto: CreateEstablishmentDto, @Request() req) {
    return this.establishmentsService.create(createEstablishmentDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get user establishments' })
  @ApiResponse({ status: 200, description: 'Establishments retrieved successfully' })
  async findAll(@Request() req) {
    return this.establishmentsService.findByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get establishment by ID' })
  @ApiResponse({ status: 200, description: 'Establishment retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.establishmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update establishment' })
  @ApiResponse({ status: 200, description: 'Establishment updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
    @Request() req,
  ) {
    return this.establishmentsService.update(id, updateEstablishmentDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete establishment' })
  @ApiResponse({ status: 200, description: 'Establishment deleted successfully' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.establishmentsService.remove(id, req.user.id);
  }
} 