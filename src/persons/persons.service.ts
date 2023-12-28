import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Person } from './entities';
import { FilesService } from '../files/files.service';
import { AddPersonDto, SelectDto, SignInDto, UpdateDataDto, UpdatePasswordDto } from './dto';


@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)private personRepository: Repository<Person>,
    private fileService: FilesService,
    private jwtService: JwtService
  ){}
  
  async add_admin(addPersonDto: AddPersonDto, image: any): Promise<Object>  {
    const [ admin ] = await this.personRepository.findBy({ email: addPersonDto.email });
    if(admin) return { 
                        message: 'email already exists',
                        status: HttpStatus.CONFLICT
                      };

    const file = await this.fileService.createFile(image);

    const hashed_password = await bcrypt.hash(addPersonDto.password, 7);

    const new_admin = await this.personRepository.save(
      { 
        img_url: `http://34.136.49.137:${process.env.API_PORT}/`+file,
        ...addPersonDto,
        hashed_password
      }
    );

    await this.personRepository.update(
      { 
        person_id: new_admin.person_id
      },
      {
        is_admin: true
      }
    );

    const admin_new =  await this.personRepository.findBy({ email: new_admin.email, person_id: new_admin.person_id });

    return {
      message: 'added successfully',
      status: HttpStatus.OK,
      person: admin_new
    };
  }

  async add_teacher(addPersonDto: AddPersonDto, image: any): Promise<Object>  {
    const [ teacher ] = await this.personRepository.findBy({ email: addPersonDto.email });
    if(teacher) return { 
                        message: 'email already exists',
                        status: HttpStatus.CONFLICT
                      };

    const file = await this.fileService.createFile(image);

    const hashed_password = await bcrypt.hash(addPersonDto.password, 7);

    const new_teacher = await this.personRepository.save(
      { 
        img_url: `http://34.136.49.137:${process.env.API_PORT}/`+file,
        ...addPersonDto,
        hashed_password
      }
    );

    await this.personRepository.update(
      { 
        person_id: new_teacher.person_id
      },
      {
        is_teacher: true
      }
    );

    const teacher_new =  await this.personRepository.findBy({ email: new_teacher.email, person_id: new_teacher.person_id });

    console.log(teacher_new);
    
    return {
      message: 'added successfully',
      status: HttpStatus.OK,
      teacher: teacher_new
    };
  }

  async add_student(addPersonDto: AddPersonDto, image: any): Promise<Object>  {
    const [ student ] = await this.personRepository.findBy({ email: addPersonDto.email });
    if(student) return { 
                         message: 'email already exists',
                         status: HttpStatus.CONFLICT
                       };

    const file = await this.fileService.createFile(image);

    const hashed_password = await bcrypt.hash(addPersonDto.password, 7);

    const new_student = await this.personRepository.save(
      { 
        img_url: `http://34.136.49.137:${process.env.API_PORT}/`+file,
        ...addPersonDto,
        hashed_password
      }
    );

    await this.personRepository.update(
      { 
        person_id: new_student.person_id
      },
      {
        is_student: true
      }
    );

    const student_new =  await this.personRepository.findBy({ email: new_student.email, person_id: new_student.person_id });

    return {
      message: 'added successfully',
      status: HttpStatus.OK,
      student: student_new
    };
  }

  async signIn(signInDto: SignInDto): Promise<Object> {
    const [person] = await this.personRepository.findBy({ email: signInDto.email });
    
    if (!person) return {
                          message: 'Email or password is incorrect',
                          status: HttpStatus.NOT_FOUND
                        };

    const pass = await bcrypt.compare(signInDto.password, person.hashed_password);
    if (!pass) return { 
                        message: 'Email or password is incorrect',
                        status: HttpStatus.NOT_FOUND 
                      };

    if(!person.is_active) return {
                                  message: 'person is blocked',
                                  status: HttpStatus.FORBIDDEN
                                };

    const token = await this.getToken(person);
    
    if (person.is_admin) {
      return {
               message: 'Sign in succesfully Admin', 
               status: HttpStatus.OK,
               person: person,
               token
             }
    } else if (person.is_teacher) {
      return {
               message: 'Sign in succesfully Teacher', 
               status: HttpStatus.OK,
               person: person,
               token: token
             }
    }  else if (person.is_super_admin) {
      return {
               message: 'Sign in succesfully Super Admin', 
               status: HttpStatus.OK,
               person: person,
               token: token
             }
    }  else if (person.is_student) {
      return {
               message: 'Sign in succesfully Student', 
               status: HttpStatus.OK,
               person: person,
               token: token
             }
    } 
  }

  async find_one_super_admin(id: number): Promise<Object> {
    const [ superAdmin ] = await this.personRepository.findBy({ person_id: id, is_super_admin: true, is_active: true });
    if (!superAdmin) return {
                              message: 'Super Admin Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            super_admin: superAdmin
           };
  }

  async find_one_admin(id: number): Promise<Object> {
    const [ admin ] = await this.personRepository.findBy({ person_id: id, is_admin: true, is_active: true });
    if (!admin) return {
                              message: 'Admin Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            admin
           };
  }

  async find_one_teacher(id: number): Promise<Object> {
    const [ teacher ] = await this.personRepository.findBy({ person_id: id, is_teacher: true, is_active: true });
    if (!teacher) return {
                              message: 'Teacher Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            teacher
           };
  }

  async find_one_student(id: number): Promise<Object> {
    const [ student ] = await this.personRepository.findBy({ person_id: id, is_student: true, is_active: true });
    if (!student) return {
                              message: 'Student Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            student
           };
  }

  async searche_admin(email: string): Promise<Object> {
    const admin = await this.personRepository.find({
      where : {
        email : Like(`%${email}%`),
        is_admin: true
      }
    });

    if (admin.length === 0) return {
                              message: 'Admin Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            admin
           };
  }

  async searche_teacher(email: string): Promise<Object> {
    const teacher = await this.personRepository.find({
      where : {
        email : Like(`%${email}%`),
        is_teacher: true
      }
    });

    if (teacher.length === 0) return {
                              message: 'Teacher Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
    return {
            status: HttpStatus.OK,
            teacher
           };
  }

  async searche_student(email: string): Promise<Object> {
    const student = await this.personRepository.find({
      where : {
        email : Like(`%${email}%`),
        is_student: true
      }
    });

    if (student.length === 0) return {
                                       message: 'Student Not Found',
                                       status: HttpStatus.NOT_FOUND
                                     };
    return {
            status: HttpStatus.OK,
            student
           };
  }

  async select_limit_admin(selectDto: SelectDto): Promise<Object> {
    const admins = await this.personRepository.find({ where: {is_active: true, is_admin: true} });
    if (admins.length === 0) return {
                                      message: 'Admins Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
                                    
    let limit_admins = [];
    if (selectDto.sort === 1 || selectDto.sort < 1) {
      let num = 0;
      for (let index = num; index < num + selectDto.limit; index++) {
        if (admins[index] === undefined) break;

        limit_admins.push(admins[index]);
      };
    } else {
      let num = (selectDto.sort - 1) * selectDto.limit;
      for (let index = num; index < num + selectDto.limit; index++) {
        if (admins[index] === undefined) break;

        limit_admins.push(admins[index]);
      };
    }

    if (limit_admins.length === 0) return {
                                            message: 'Admins Not Found',
                                            status: HttpStatus.NOT_FOUND
                                          };

    return {
            status: HttpStatus.OK,
            limit_admins
           };
  }

  async select_limit_teacher(selectDto: SelectDto): Promise<Object> {
    const teachers = await this.personRepository.find({ where: {is_active: true, is_teacher: true}});
    if (teachers.length === 0) return {
                                      message: 'Teacher Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
                                    
    let limit_teachers = [];
    if (selectDto.sort === 1 || selectDto.sort < 1) {
      let num = 0;
      for (let index = num; index < num + selectDto.limit; index++) {
        if (teachers[index] === undefined) break;

        limit_teachers.push(teachers[index]);
      };
    } else {
      let num = (selectDto.sort - 1) * selectDto.limit;
      for (let index = num; index < num + selectDto.limit; index++) {
        if (teachers[index] === undefined) break;

        limit_teachers.push(teachers[index]);
      };
    }

    if (limit_teachers.length === 0) return {
                                            message: 'Teachers Not Found',
                                            status: HttpStatus.NOT_FOUND
                                          };

    return {
            status: HttpStatus.OK,
            limit_teachers
           };
  }

  async select_limit_student(selectDto: SelectDto): Promise<Object> {
    const students = await this.personRepository.find({ where: {is_active: true, is_student: true} });
    if (students.length === 0) return {
                                        message: 'Students Not Found',
                                        status: HttpStatus.NOT_FOUND
                                      };
                                    
    let limit_students = [];
    if (selectDto.sort === 1 || selectDto.sort < 1) {
      let num = 0;
      for (let index = num; index < num + selectDto.limit; index++) {
        if (students[index] === undefined) break;

        limit_students.push(students[index]);
      };
    } else {
      let num = (selectDto.sort - 1) * selectDto.limit;
      for (let index = num; index < num + selectDto.limit; index++) {
        if (students[index] === undefined) break;

        limit_students.push(students[index]);
      };
    }

    if (limit_students.length === 0) return {
                                            message: 'Students Not Found',
                                            status: HttpStatus.NOT_FOUND
                                          };

    return {
            status: HttpStatus.OK,
            limit_students
           };
  }

  async find_admins(): Promise<Object> {
    const admins = await this.personRepository.find({ where: {is_active: true, is_admin: true} });
    if (admins.length === 0) return {
                                      message: 'Admins Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            admins
           }
  }

  async find_teachers(): Promise<Object> {
    const teachers = await this.personRepository.find({ where: {is_active: true, is_teacher: true} });
    if (teachers.length === 0) return {
                                      message: 'Teachers Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            teachers
           }
  }

  async find_students(): Promise<Object> {
    const students = await this.personRepository.find({ where: {is_active: true, is_student: true} });
    if (students.length === 0) return {
                                        message: 'Students Not Found',
                                        status: HttpStatus.NOT_FOUND
                                      };
    return {
            status: HttpStatus.OK,
            students
           }
  }

  async find_not_active_persons(): Promise<Object> {
    const persons = await this.personRepository.find({ where: {is_active: false} });
    if (persons.length === 0) return {
                                      message: 'Persons Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            persons
           }
  }

  async update_data(id: number, updateDataDto: UpdateDataDto): Promise<Object> {
    const [ person ] = await this.personRepository.findBy({ person_id: id });

    if(!person) return {
                          message: 'Person not found',
                          status: HttpStatus.NOT_FOUND
                         };
    
    if (person.email !== updateDataDto.email) {
      const [ email ] = await this.personRepository.findBy({ email: updateDataDto.email });
      
      if (!email) return {
                            message: 'email already exists',
                            status: HttpStatus.NOT_FOUND
                         };
    }
    
    await this.personRepository.update(
      { 
        person_id: id
      },
      {
        ...updateDataDto
      }
    );

    const update_person = await this.personRepository.findBy({ person_id: id });

    return {
            status: HttpStatus.OK,
            peroson: update_person
           }
  }

  async update_password(id: number, updatePasswordDto: UpdatePasswordDto): Promise<Object>  {
    const [ person ] = await this.personRepository.findBy({ person_id: id });
    if (!person) return {
                          message: 'Person Not Found',
                          status: HttpStatus.NOT_FOUND
                        };

    const pass = await bcrypt.compare(updatePasswordDto.password, person.hashed_password);
    if (!pass) return { 
                        message: 'Old password is incorrect', 
                        status: HttpStatus.CONFLICT
                      };

    if(updatePasswordDto.new_password != updatePasswordDto.confirm_password) return {
                                                                                      message: 'confirm password is incorrect',
                                                                                      status: HttpStatus.UNAUTHORIZED
                                                                                    };
                                                                                    
    const hashed_password = await bcrypt.hash(updatePasswordDto.new_password, 7);

    await this.personRepository.update(
      {
        person_id: id
      }, 
      {
        hashed_password
      }
    );

    const [ update_pass_person] =  await this.personRepository.findBy({ person_id: id });

    return {
            status: HttpStatus.OK,
            person: update_pass_person
           }
  }

  async active(id: number): Promise<Object | HttpStatus> {
    const [ perosn ] = await this.personRepository.findBy({ person_id: id });
    if (!perosn) return {
                          message: 'Person Not Found',
                          status: HttpStatus.NOT_FOUND
                        };
    
    if (perosn.is_active) {
      await this.personRepository.update(
        { 
          person_id: id
        },
        {
          is_active: false
        }
      );
      return {
              message: 'Person blocked',
              status: HttpStatus.OK
             }
    } else {
      await this.personRepository.update(
        { 
          person_id: id
        },
        {
          is_active: true
        }
      );
      return {
              message: 'Person ativeted',
              status: HttpStatus.OK
             }
    }
  }

  async remove_person(id: number): Promise<HttpStatus> {
    const [ person ] = await this.personRepository.findBy({ person_id: id });
    if(!person) return HttpStatus.NOT_FOUND;

    await this.personRepository.delete({ person_id: id });

    return HttpStatus.OK;
  } 


  async getToken(person: Person) {
    const jwtPayload = { 
                        id: person.person_id,
                        is_admin: person.is_admin,
                        is_student: person.is_student,
                        is_teacher: person.is_teacher,
                        is_super_admin: person.is_super_admin,
                        is_block: person.is_active 
                       };
  
    const token = await this.jwtService.signAsync(jwtPayload, {
                    secret: process.env.ACCES_TOKEN_KEY_PERSON,
                    expiresIn: process.env.ACCESS_TOKEN_TIME
                  })
    return token;
  }
}