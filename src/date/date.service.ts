import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Data } from './entities';
import { CreateDateDto, UpdateDateDto } from './dto';

@Injectable()
export class DateService {
  constructor(@InjectRepository(Data) private dateRepository: Repository<Data> ) {}

  async createDate(createDateDto: CreateDateDto): Promise<Object> {
    const newDate = await this.dateRepository.save({ ...createDateDto });    

    return {
            message: 'Create successfully',
            date: newDate,
            status: HttpStatus.OK
           };
  }

  async findAllDate(): Promise<Object> {
    const dates = await this.dateRepository.find();

    if(dates.length === 0) return {
                                    message: 'Dates Not Found',
                                    status: HttpStatus.NOT_FOUND
                                  };
    return {
            dates,
            status: HttpStatus.OK
           };
  }

  async findOneDate(id: number): Promise<Object> {
    const [ date ] = await this.dateRepository.findBy({ date_id: id });
    if (!date) return {
                        message: 'Date Not Found',
                        status: HttpStatus.NOT_FOUND
                      };
    return {
            date,
            status: HttpStatus.OK
           };
  }

  async updateDate(id: number, updateDateDto: UpdateDateDto): Promise<Object> {
    await this.dateRepository.update(
      { 
        date_id: id
      },
      {
        ...updateDateDto
      }
    );
    const [ updateDate ] =  await this.dateRepository.findBy({ date_id: id });

    return {
            date: updateDate,
            status: HttpStatus.OK
           };
  }

  async removeDate(id: number): Promise<HttpStatus | Object> {
    const [ date ] = await this.dateRepository.findBy({ date_id: id });
    if (!date) return {
                        message: 'Date Not Found',
                        status: HttpStatus.NOT_FOUND
                      };

    await this.dateRepository.delete({ date_id: id });

    return HttpStatus.OK;
  }
}