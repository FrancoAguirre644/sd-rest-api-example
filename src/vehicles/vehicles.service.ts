import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async create(
    createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleEntity> {
    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      active: true,
    });

    return this.vehicleRepository.save(vehicle);
  }
}