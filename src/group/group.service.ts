import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Group } from './entities/group.entity';
import { CreateGroupDto, UpdateGroupDto } from './dto';


@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group)private groupRepository: Repository<Group> ){}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Object> {
    const  [group]  = await this.groupRepository.findBy({ name: createGroupDto.name });
    if (group) return {
                              message: 'Group name already exists',
                              status: HttpStatus.CONFLICT
                      };
    
    const newGroup = await this.groupRepository.save({...createGroupDto});

    return {
            message: 'Create successfully',
            group: newGroup,
            status: HttpStatus.OK
           };
  }

  async findAllGroup(): Promise<Object> {
    const groups = await this.groupRepository.find();

    if(groups.length === 0) return {
                                     message: 'Groups Not Found',
                                     status: HttpStatus.NOT_FOUND
                                   };
    return {
            groups,
            status: HttpStatus.OK
           };
  }

  async findOneGroup(id: number): Promise<Object> {
    const [group] = await this.groupRepository.findBy({ group_id: id });

    if (!group) return {
                         message: 'Group Not Found',
                         status: HttpStatus.NOT_FOUND
                       };
    return {
            group,
            status: HttpStatus.OK
           };
  }

  async updateOneGroup(id: number, updateGroupDto: UpdateGroupDto): Promise<Object> {
    const [ group ] = await this.groupRepository.findBy({ name: updateGroupDto.name });
    if (group) return {
                         message: 'Gruop name already exists',
                         status: HttpStatus.CONFLICT
                       };
    
    await this.groupRepository.update(
      { 
        course_id: id
      },
      {
        ...updateGroupDto
      }
    );

    const [ updateGroup ] =  await this.groupRepository.findBy({ group_id: id });

    return {
            group: updateGroup,
            status: HttpStatus.OK
           };
  }

  async removeOneGroup(id: number): Promise<HttpStatus | Object> {
    const [ group ] = await this.groupRepository.findBy({ group_id: id });
    if (!group) return {
                         message: 'Group Not Found',
                         status: HttpStatus.NOT_FOUND
                       };

    await this.groupRepository.delete({ course_id: id });

    return HttpStatus.OK;
  }

  async searcheGroup(name: string): Promise<Object> {
    const group = await this.groupRepository.find({
      where : {
        name : Like(`%${name}%`)
      }
    });

    if (group.length === 0) return {
                                      message: 'Group Not Found',
                                      status: HttpStatus.NOT_FOUND
                                    };
    return {
            status: HttpStatus.OK,
            group
           };
  }
}