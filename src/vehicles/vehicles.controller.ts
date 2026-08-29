import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
  ) {}

  @ApiOperation({
    summary: 'Get all vehicles',
    description: 'Returns a list of all vehicles.',
  })
  @ApiOkResponse({
    description: 'Vehicles retrieved successfully',
    type: VehicleEntity,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @ApiOperation({
    summary: 'Search vehicles',
    description:
      'Searches active vehicles by license plate, brand, model, or color.',
  })
  @ApiQuery({
    name: 'search',
    description:
      'Text to search in license plate, brand, model, or color.',
    example: 'Toyota',
  })
  @ApiOkResponse({
    description: 'Vehicles found successfully',
    type: VehicleEntity,
    isArray: true,
  })
  @Get('search')
  search(@Query('search') search: string) {
    return this.vehiclesService.search(search);
  }

  @ApiOperation({
    summary: 'Get a vehicle by ID',
    description: 'Returns a vehicle using its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Vehicle retrieved successfully',
    type: VehicleEntity,
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a vehicle',
    description: 'Creates a new vehicle.',
  })
  @ApiOkResponse({
    description: 'Vehicle created successfully',
    type: VehicleEntity,
  })
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @ApiOperation({
    summary: 'Update a vehicle',
    description: 'Updates an existing vehicle.',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Vehicle updated successfully',
    type: VehicleEntity,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehiclesService.update(
      id,
      updateVehicleDto,
    );
  }

  @ApiOperation({
    summary: 'Delete a vehicle',
    description: 'Deactivates a vehicle using its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Vehicle deactivated successfully',
    type: VehicleEntity,
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.remove(id);
  }
}