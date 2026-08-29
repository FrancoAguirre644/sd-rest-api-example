import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(
        private readonly vehiclesService: VehiclesService,
    ) { }

    @Get()
    findAll() {
        return this.vehiclesService.findAll();
    }

    @Get('search')
    search(@Query('search') search: string) {
        return this.vehiclesService.search(search);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.vehiclesService.findOne(Number(id));
    }

    @Post()
    create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehiclesService.create(createVehicleDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
        return this.vehiclesService.update(
            Number(id),
            updateVehicleDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehiclesService.remove(Number(id));
    }
}