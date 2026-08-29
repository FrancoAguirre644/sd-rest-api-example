import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { VehicleType } from '../enums/vehicle-type.enum';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  licensePlate!: string;

  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;

  @Column()
  color!: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
  })
  type!: VehicleType;

  @Column({ default: true })
  active!: boolean;
}