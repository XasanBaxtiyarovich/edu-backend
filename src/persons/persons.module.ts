import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from './entities';
import { PersonsService } from './persons.service';
import { FilesModule } from '../files/files.module';
import { PersonsController } from './persons.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Person
      ]
    ),
    JwtModule.register(
      {}
    ),
    FilesModule
  ],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}