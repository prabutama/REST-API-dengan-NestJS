import {Body, Controller, Post, Get, Param, Patch, Query, Delete, UseInterceptors} from '@nestjs/common';
import { CreateUSerDto } from './dtos/create-user.dto';
import { UpdateUSerDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { LoginUserDto } from './dtos/login.dto';
import { Serialize } from '../interceptors/Serialize.interceptor';
import { AuthService } from './auth.service';


@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Post()
    createUser(@Body() body: CreateUSerDto) {
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
    
    @Post('/register')
    register(@Body() body: CreateUSerDto) {
        return this.authService.register(body.name, body.email, body.password);
    }

    @Post('/login') 
    login(@Body() body: LoginUserDto) {
        return this.authService.login(body.email, body.password);
    }

}
