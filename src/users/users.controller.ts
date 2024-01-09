import {Body, Controller, Post, Get, Param, Patch, Query, Delete, Session, NotFoundException} from '@nestjs/common';
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
    async register(@Body() body: CreateUSerDto, @Session() session: any) {
        const user = await this.authService.register(body.name, body.email, body.password);
        session.userId = user.id;
        return user;

    }

    @Post('/login') 
    async login(@Body() body: LoginUserDto, @Session() session: any) {
        const user = await this.authService.login( body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/logout')
    logout(@Session() session: any) {
        session.userId = null;
    }

    @Get('/auth/whoami') 
    async whoami(@Session() session: any) {
        const user = await this.usersService.findOneBy(session.userId);
        return user;
    }

}
