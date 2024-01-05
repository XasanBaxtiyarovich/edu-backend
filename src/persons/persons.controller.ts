import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';

import { Person } from './entities';
import { PersonsService } from './persons.service';
import { AddPersonDto, SelectDto, SignInDto, UpdateDataDto, UpdatePasswordDto } from './dto';


@ApiTags('persons')
@Controller('')
export class PersonsController {
  constructor( private readonly personsService: PersonsService ) {}

  // Added Person
  @ApiOperation({summary: 'Add person'})
  @ApiResponse({status: 200, type: Person})
  @Post('add-person')
  add_person(
    @Body() addPersonDto: AddPersonDto
  ): Promise<Object> {
    return this.personsService.add_person(addPersonDto);
  }

  // Sign In
  @ApiOperation({summary: 'Sign in'})
  @ApiResponse({status: 200, type: Person})
  @Post('signin')
  signIn(
    @Body() SignInDto: SignInDto
  ): Promise<Object> {
    return this.personsService.signIn(SignInDto)
  }

  // Find One Super Admin
  @ApiOperation({summary: 'Find one super admin'})
  @ApiResponse({status: 200, type: Person})
  @Get('find-one/super-admin/:id')
  find_one_super_admin(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.find_one_super_admin(id);
  }

  // Find One Admin or Teacher
  @ApiOperation({summary: 'Find one admin or teacher'})
  @ApiResponse({status: 200, type: Person})
  @Get('find-one/staff')
  find_one_staff(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.find_one_staff(id);
  }

  // Find One Student
  @ApiOperation({summary: 'Find one student'})
  @ApiResponse({status: 200, type: Person})
  @Get('find-one/student/:id')
  find_one_student(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.find_one_student(id);
  }

  // Searche One Admin
  @ApiOperation({summary: 'Searche admin'})
  @ApiResponse({status: 200, type: Person})
  @Get('searche/admin/:name')
  searche_admin(
    @Param('name') name: string
  ): Promise<Object> {
    return this.personsService.searche_admin(name);
  }

  // Searche One Teacher
  @ApiOperation({summary: 'Searche teacher'})
  @ApiResponse({status: 200, type: Person})
  @Get('searche/teacher/:name')
  searche_teacher(
    @Param('name') name: string
  ): Promise<Object> {
    return this.personsService.searche_teacher(name);
  }

  // Searche One Student
  @ApiOperation({summary: 'Searche student'})
  @ApiResponse({status: 200, type: Person})
  @Get('searche/student/:name')
  searche_student(
    @Param('name') name: string
  ): Promise<Object> {
    return this.personsService.searche_student(name);
  }

  // Find Limited admins
  @ApiOperation({summary: 'Find limited admins'})
  @ApiResponse({status: 200, type: [Person]})
  @Post('limit/admin')
  select_limit_admin(
    @Body() selectDto: SelectDto
  ): Promise<Object> {
    return this.personsService.select_limit_admin(selectDto);
  }

  // Find Limited teachers
  @ApiOperation({summary: 'Find limited teachers'})
  @ApiResponse({status: 200, type: [Person]})
  @Post('limit/teacher')
  select_limit_teacher(
    @Body() selectDto: SelectDto
  ): Promise<Object> {
    return this.personsService.select_limit_teacher(selectDto);
  }

  // Find Limited students
  @ApiOperation({summary: 'Find limited students'})
  @ApiResponse({status: 200, type: [Person]})
  @Post('limit/student')
  select_limit_student(
    @Body() selectDto: SelectDto
  ): Promise<Object> {
    return this.personsService.select_limit_student(selectDto);
  }

  // Find Admins and Teachers
  @ApiOperation({summary: 'Find all admins and students'})
  @ApiResponse({status: 200, type: [Person]})  
  @Get('find/admins-teachers')
  find_admins_and_teachers(): Promise<Object> {
    return this.personsService.find_admins_and_teachers();
  }

  // Find All Admins 
  @ApiOperation({summary: 'Find all admins'})
  @ApiResponse({status: 200, type: [Person]})
  @Get('find-all/admins')
  find_admins(): Promise<Object> {
    return this.personsService.find_admins()
  };

  // Find All Teachers 
  @ApiOperation({summary: 'Find all teachers'})
  @ApiResponse({status: 200, type: [Person]})
  @Get('find-all/teachers')
  find_teachers(): Promise<Object> {
    return this.personsService.find_teachers()
  };

  // Find All Students 
  @ApiOperation({summary: 'Find all students'})
  @ApiResponse({status: 200, type: [Person]})
  @Get('find-all/students')
  find_students(): Promise<Object> {
    return this.personsService.find_students()
  };

  // Find Not Active Persons 
  @ApiOperation({summary: 'Find all not active persons'})
  @ApiResponse({status: 200, type: [Person]})
  @Get('find-not-active/persons')
  find_not_active_persons(): Promise<Object> {
    return this.personsService.find_not_active_persons()
  };

  // Update Persom Data
  @ApiOperation({summary: 'Update data person'})
  @ApiResponse({status: 200, type: Person})
  @Put('update/:id')
  update_data(
    @Param('id') id: number, 
    @Body() updateDataDto: UpdateDataDto
  ): Promise<Object> {
    return this.personsService.update_data(id, updateDataDto)
  }

  // Update Perosn Password
  @ApiOperation({summary: 'Update password person'})
  @ApiResponse({status: 200, type: Person})
  @Put('update-password/:id')
  update_password(
    @Param('id') id: number, 
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<Object> {
    return this.personsService.update_password(id, updatePasswordDto);
  }

  // Not Active or Active
  @ApiOperation({summary: 'Update active person'})
  @ApiResponse({status: 200, type: Person})
  @Get('active/:id')
  is_admin_user(
    @Param('id') id: number
  ): Promise<Object> {
    return this.personsService.active(id)
  }

  // Remove One User BY ID
  @ApiOperation({summary: 'Remove person'})
  @ApiResponse({status: 200})
  @Delete('remove/:id')
  remove_person(
    @Param('id') id: number
  ): Promise<Number> {
    return this.personsService.remove_person(id);
  }
}