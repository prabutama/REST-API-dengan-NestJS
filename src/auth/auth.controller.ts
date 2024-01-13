import { Body, Controller, Post, Get, Session, UseInterceptors, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dtos/login.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Serialize } from '../interceptors/Serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from '../users/user.entity'

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}
    @Post('/register')
    async register(@Body() body: CreateUserDto, @Session() session: any) {
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

    @Get('/whoami') 
    async whoami(@CurrentUser() user: User) {
        return user;
    }

}

