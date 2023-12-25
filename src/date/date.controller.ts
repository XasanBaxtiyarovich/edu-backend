import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { Data } from './entities';
import { DateService } from './date.service';
import { CreateDateDto, UpdateDateDto } from './dto';


@ApiTags('date')
@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  // Create Date
  @ApiOperation({summary: 'Create date'})
  @ApiResponse({status: 200, type: Data})
  @Post('create')
  createDate(
    @Body() createDateDto: CreateDateDto
  ): Promise<Object> {
    return this.dateService.createDate(createDateDto);
  }

  // Find all Date
  @ApiOperation({summary: 'Find all date'})
  @ApiResponse({status: 200, type: [Data]})
  @Get('find')
  findAllDate(): Promise<Object> {
    return this.dateService.findAllDate();
  }

  // Find By ID Date
  @ApiOperation({summary: 'Find one date'})
  @ApiResponse({status: 200, type: Data})
  @Get('find/:id')
  findOneDate(
    @Param('id') id: number
  ): Promise<Object> {
    return this.dateService.findOneDate(id);
  }
  
  // Update One Date
  @ApiOperation({summary: 'Update one date'})
  @ApiResponse({status: 200, type: Data})
  @Put('update/:id')
  updateDate(
    @Param('id') id: string, 
    @Body() updateDateDto: UpdateDateDto,
  ): Promise<Object> {
    return this.dateService.updateDate(+id, updateDateDto);
  }

  // Remove One Date
  @ApiOperation({summary: 'Remove one date'})
  @ApiResponse({status: 200})
  @Delete('delete/:id')
  removeDate(
    @Param('id') id: number
  ): Promise<Number | Object> {
    return this.dateService.removeDate(id);
  }
}
