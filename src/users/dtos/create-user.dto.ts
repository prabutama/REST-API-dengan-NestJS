import { IsString, IsEmail } from "class-validator";

export class CreateUSerDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}