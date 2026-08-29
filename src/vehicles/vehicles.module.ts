import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleEntity } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
  ],
  providers: [VehiclesService],
})
export class VehiclesModule {}