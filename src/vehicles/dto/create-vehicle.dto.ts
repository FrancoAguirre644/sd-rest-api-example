import { VehicleType } from '../enums/vehicle-type.enum';

export class CreateVehicleDto {
  licensePlate!: string;
  brand!: string;
  model!: string;
  year!: number;
  color!: string;
  type!: VehicleType;
}