import { ApiProperty } from '@nestjs/swagger';
import { VehicleType } from '../enums/vehicle-type.enum';

export class CreateVehicleDto {
  @ApiProperty({
    example: 'AB123CD',
    description: 'Vehicle license plate',
  })
  licensePlate!: string;

  @ApiProperty({
    example: 'Toyota',
    description: 'Vehicle brand',
  })
  brand!: string;

  @ApiProperty({
    example: 'Corolla',
    description: 'Vehicle model',
  })
  model!: string;

  @ApiProperty({
    example: 2024,
    description: 'Vehicle manufacturing year',
  })
  year!: number;

  @ApiProperty({
    example: 'White',
    description: 'Vehicle color',
  })
  color!: string;

  @ApiProperty({
    enum: VehicleType,
    example: VehicleType.SEDAN,
    description: 'Vehicle type',
  })
  type!: VehicleType;
}