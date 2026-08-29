import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { VehicleType } from '../enums/vehicle-type.enum';

export class UpdateVehicleDto {
  @ApiPropertyOptional({
    example: 'AB123CD',
    description: 'Vehicle license plate',
  })
  licensePlate?: string;

  @ApiPropertyOptional({
    example: 'Toyota',
    description: 'Vehicle brand',
  })
  brand?: string;

  @ApiPropertyOptional({
    example: 'Corolla',
    description: 'Vehicle model',
  })
  model?: string;

  @ApiPropertyOptional({
    example: 2024,
    description: 'Vehicle manufacturing year',
  })
  year?: number;

  @ApiPropertyOptional({
    example: 'White',
    description: 'Vehicle color',
  })
  color?: string;

  @ApiPropertyOptional({
    enum: VehicleType,
    example: VehicleType.SEDAN,
    description: 'Vehicle type',
  })
  type?: VehicleType;
}