import { Injectable } from '@nestjs/common';
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
  ) {}

  async findAll(): Promise<VehicleEntity[]> {
    return this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<VehicleEntity | null> {
    return this.vehicleRepository.findOne({
      where: {
        id,
      },
    });
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
  ): Promise<VehicleEntity | null> {
    const vehicle = await this.vehicleRepository.findOne({
      where: {
        id,
      },
    });

    if (!vehicle) {
      return null;
    }

    Object.assign(vehicle, updateVehicleDto);

    return this.vehicleRepository.save(vehicle);
  }
}