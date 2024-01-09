import { IsString, IsEmail, isString, IsNumber } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}