import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto } from './dto'

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // Create Group
  @Post('create')
  createRoom(
    @Body() createGroupDto: CreateGroupDto
  ): Promise<Object> {
    return this.groupService.createGroup(createGroupDto);
  }

  // Find All Groups
  @Get('find')
  findAllGroups(): Promise<Object> {
    return this.groupService.findAllGroup();
  }

  // Find One Group
  @Get('find/:id')
  findOneGroup(
    @Param('id') id: number
  ): Promise<Object> {
    return this.groupService.findOneGroup(id);
  }

  // Update One Group
  @Put(':id')
  updateOneGroup(
    @Param('id') id: number, 
    @Body() updateGroupDto: UpdateGroupDto
  ): Promise<Object> {
    return this.groupService.updateOneGroup(id, updateGroupDto);
  }

  // Remove One Group
  @Delete(':id')
  removeOneGroup(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.groupService.removeOneGroup(id);
  }

  // Searche One Group
  @Get('search')
  searcheGroup(
    @Param('name') name: string
  ): Promise<Object> {
    return this.groupService.searcheGroup(name);
  }
}
