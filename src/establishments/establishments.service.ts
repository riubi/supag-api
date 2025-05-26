import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentsService {
  constructor(
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
  ) {}

  async create(createEstablishmentDto: CreateEstablishmentDto, userId: string) {
    const establishment = this.establishmentRepository.create({
      ...createEstablishmentDto,
      userId,
    });

    return this.establishmentRepository.save(establishment);
  }

  async findByUser(userId: string) {
    return this.establishmentRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const establishment = await this.establishmentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }

    return establishment;
  }

  async update(id: string, updateEstablishmentDto: UpdateEstablishmentDto, userId: string) {
    const establishment = await this.findOne(id);

    if (establishment.userId !== userId) {
      throw new ForbiddenException('You can only update your own establishments');
    }

    Object.assign(establishment, updateEstablishmentDto);
    return this.establishmentRepository.save(establishment);
  }

  async remove(id: string, userId: string) {
    const establishment = await this.findOne(id);

    if (establishment.userId !== userId) {
      throw new ForbiddenException('You can only delete your own establishments');
    }

    await this.establishmentRepository.remove(establishment);
    return { message: 'Establishment deleted successfully' };
  }
} 