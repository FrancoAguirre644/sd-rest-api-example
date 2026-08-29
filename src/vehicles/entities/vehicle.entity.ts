import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { VehicleType } from '../enums/vehicle-type.enum';

@Entity('vehicles')
export class VehicleEntity {
  @ApiProperty({
    example: 1,
    description: 'Vehicle identifier',
  })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({
    example: 'AB123CD',
    description: 'Vehicle license plate',
  })
  @Column({ unique: true })
  licensePlate!: string;

  @ApiProperty({
    example: 'Toyota',
    description: 'Vehicle brand',
  })
  @Column()
  brand!: string;

  @ApiProperty({
    example: 'Corolla',
    description: 'Vehicle model',
  })
  @Column()
  model!: string;

  @ApiProperty({
    example: 2024,
    description: 'Vehicle manufacturing year',
  })
  @Column()
  year!: number;

  @ApiProperty({
    example: 'White',
    description: 'Vehicle color',
  })
  @Column()
  color!: string;

  @ApiProperty({
    enum: VehicleType,
    example: VehicleType.SEDAN,
    description: 'Vehicle type',
  })
  @Column({
    type: 'enum',
    enum: VehicleType,
  })
  type!: VehicleType;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the vehicle is active',
  })
  @Column({ default: true })
  active!: boolean;
}