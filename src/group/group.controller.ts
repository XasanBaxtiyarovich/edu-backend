import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { Group } from './entities';
import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto } from './dto'


@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // Create Group
  @ApiOperation({summary: 'Create group'})
  @ApiResponse({status: 200, type: Group})
  @Post('create')
  createRoom(
    @Body() createGroupDto: CreateGroupDto
  ): Promise<Object> {
    return this.groupService.createGroup(createGroupDto);
  }

  // Find All Groups
  @ApiOperation({summary: 'Find all groups'})
  @ApiResponse({status: 200, type: [Group]})
  @Get('find')
  findAllGroups(): Promise<Object> {
    return this.groupService.findAllGroup();
  }

  // Find One Group
  @ApiOperation({summary: 'Find one group'})
  @ApiResponse({status: 200, type: Group})
  @Get('find/:id')
  findOneGroup(
    @Param('id') id: number
  ): Promise<Object> {
    return this.groupService.findOneGroup(id);
  }

  // Update One Group
  @ApiOperation({summary: 'Update one group'})
  @ApiResponse({status: 200, type: Group})
  @Put(':id')
  updateOneGroup(
    @Param('id') id: number, 
    @Body() updateGroupDto: UpdateGroupDto
  ): Promise<Object> {
    return this.groupService.updateOneGroup(id, updateGroupDto);
  }

  // Remove One Group
  @ApiOperation({summary: 'Remove one group'})
  @ApiResponse({status: 200})
  @Delete(':id')
  removeOneGroup(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.groupService.removeOneGroup(id);
  }

  // Searche One Group
  @ApiOperation({summary: 'Searche group'})
  @ApiResponse({status: 200, type: Group})
  @Get('search/:name')
  searcheGroup(
    @Param('name') name: string
  ): Promise<Object> {
    return this.groupService.searcheGroup(name);
  }
}
