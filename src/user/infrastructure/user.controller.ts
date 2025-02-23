import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from '../application/userUseCase.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update_user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User') // 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user, use admin as role' })
  @ApiCreatedResponse({ description: 'The user has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: 200, description: 'Users found successfully.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get('findOneById/:id')
  @ApiOperation({ summary: 'Find a user by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the user to find', type: Number })
  @ApiResponse({ status: 200, description: 'User found successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiParam({ name: 'id', description: 'ID of the user to update', type: String })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateUserDto) {
    return this.userService.editUser(id, updateProductDto);
  }


}
