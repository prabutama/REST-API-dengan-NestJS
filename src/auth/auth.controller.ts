import { Body, Controller, Post, Get, Session } from '@nestjs/common';
import { LoginUserDto } from './dtos/login.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Serialize } from 'src/interceptors/Serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
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
    async whoami(@Session() session: any) {
        const user = await this.usersService.findOneBy(session.userId);
        return user;
    }

}

