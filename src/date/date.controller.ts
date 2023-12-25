import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { DateService } from './date.service';
import { CreateDateDto, UpdateDateDto } from './dto';


@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  // Create Date
  @Post('create')
  createDate(
    @Body() createDateDto: CreateDateDto
  ): Promise<Object> {
    return this.dateService.createDate(createDateDto);
  }

  // Find all Date
  @Get('find')
  findAllDate(): Promise<Object> {
    return this.dateService.findAllDate();
  }

  // Find By ID Date
  @Get('find/:id')
  findOneDate(
    @Param('id') id: string
  ): Promise<Object> {
    return this.dateService.findOneDate(+id);
  }
  
  // Update One Date
  @Put('update/:id')
  updateDate(
    @Param('id') id: string, 
    @Body() updateDateDto: UpdateDateDto,
  ): Promise<Object> {
    return this.dateService.updateDate(+id, updateDateDto);
  }

  // Remove One Date
  @Delete('delete/:id')
  removeDate(
    @Param('id') id: number
  ): Promise<Number | Object> {
    return this.dateService.removeDate(id);
  }
}
