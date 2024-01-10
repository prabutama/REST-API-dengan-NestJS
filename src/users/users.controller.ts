import {Body, Controller, Post, Get, Param, Patch, Query, Delete, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUSerDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/Serialize.interceptor';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Post()
    createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.name, body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOneBy(parseInt(id));
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() body: UpdateUSerDto) {
        return this.usersService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }  

    @Get('/auth/currentuser') 
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: User) {
        return user;
    }
}
