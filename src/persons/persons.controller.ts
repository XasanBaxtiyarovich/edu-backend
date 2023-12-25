import { FileInterceptor } from '@nestjs/platform-express';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';

import { PersonsService } from './persons.service';
import { AddPersonDto, SignInDto, UpdateDataDto, UpdatePasswordDto } from './dto';


@Controller('')
export class PersonsController {
  constructor( private readonly personsService: PersonsService ) {}

  // Added Admin
  @Post('added-admin')
  @UseInterceptors(FileInterceptor('image'))
  add_admin(
    @UploadedFile() image: any,
    @Body() addPersonDto: AddPersonDto
  ): Promise<Object> {
    return this.personsService.add_admin(addPersonDto, image);
  }

  // Added Teacher
  @Post('added-teacher')
  @UseInterceptors(FileInterceptor('image'))
  add_teacher(
    @UploadedFile() image: any,
    @Body() addPersonDto: AddPersonDto
  ): Promise<Object> {
    return this.personsService.add_teacher(addPersonDto, image);
  }

  // Added Student
  @Post('added-student')
  @UseInterceptors(FileInterceptor('image'))
  add_student(
    @UploadedFile() image: any,
    @Body() addPersonDto: AddPersonDto
  ): Promise<Object> {
    return this.personsService.add_student(addPersonDto, image);
  }

  // Sign In
  @Post('signin')
  signIn(
    @Body() SignInDto: SignInDto
  ): Promise<Object> {
    return this.personsService.signIn(SignInDto)
  }

  // Find One Super Admin
  @Get('find-one/super-admin/:id')
  find_one_super_admin(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.find_one_super_admin(id);
  }

  // Find One Admin
  @Get('find-one/admin/:id')
  find_one_admin(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.find_one_admin(id);
  }

  // Find One Teacher
  @Get('find-one/teacher/:id')
  find_one_teacher(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.find_one_teacher(id);
  }

  // Find One Teacher
  @Get('find-one/student/:id')
  find_one_student(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.find_one_student(id);
  }

  // Searche One Admin
  @Get('searche/admin/:name')
  searche_admin(
    @Param('name') name: string
  ): Promise<Object> {
    return this.personsService.searche_admin(name);
  }

  // Searche One Teacher
  @Get('searche/teacher/:name')
  searche_teacher(
    @Param('name') name: string
  ): Promise<Object> {
    return this.personsService.searche_teacher(name);
  }

  // Searche One Teacher
  @Get('searche/student/:name')
  searche_student(
    @Param('name') name: string
  ): Promise<Object> {
    return this.personsService.searche_student(name);
  }

  // Find All Admins 
  @Get('find-all/admins')
  find_admins(): Promise<Object> {
    return this.personsService.find_admins()
  };

  // Find All Teachers 
  @Get('find-all/teachers')
  find_teachers(): Promise<Object> {
    return this.personsService.find_teachers()
  };

  // Find All Students 
  @Get('find-all/students')
  find_students(): Promise<Object> {
    return this.personsService.find_students()
  };

  // Find Not Active Persons 
  @Get('find-not-active/persons')
  find_not_active_persons(): Promise<Object> {
    return this.personsService.find_not_active_persons()
  };

  // Update Persom Data
  @Put('update/:id')
  update_data(
    @Param('id') id: number, 
    @Body() updateDataDto: UpdateDataDto
  ): Promise<Object> {
    return this.personsService.update_data(id, updateDataDto)
  }

  // Update Perosn Password
  @Put('update-password/:id')
  update_password(
    @Param('id') id: number, 
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<Object> {
    return this.personsService.update_password(id, updatePasswordDto);
  }

  // Not Active or Active
  @Get('active/:id')
  is_admin_user(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.active(id)
  }

  // Remove One User BY ID
  @Delete('remove/:id')
  remove_person(
    @Param('id') id: number
  ): Promise<Number> {
    return this.personsService.remove_person(id);
  }
}