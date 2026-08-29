import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleEntity } from './entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
  ],
})
export class VehiclesModule {}