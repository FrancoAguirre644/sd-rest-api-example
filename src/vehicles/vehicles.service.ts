import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) { }

  async findAll(): Promise<VehicleEntity[]> {
    return this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id,
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async search(search: string): Promise<VehicleEntity[]> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .where('vehicle.active = :active', { active: true })
      .andWhere(
        `(
        vehicle.licensePlate LIKE :search
        OR vehicle.brand LIKE :search
        OR vehicle.model LIKE :search
        OR vehicle.color LIKE :search
      )`,
        { search: `%${search}%` },
      )
      .getMany();
  }

  async create(
    createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      active: true,
    });

    return this.vehicleRepository.save(vehicle);
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id,
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    Object.assign(vehicle, updateVehicleDto);

    return this.vehicleRepository.save(vehicle);
  }

  async remove(id: number): Promise<VehicleEntity | null> {
    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id,
      },
    });

    if (!vehicle) {
      return null;
    }

    vehicle.active = false;

    return this.vehicleRepository.save(vehicle);
  }
}