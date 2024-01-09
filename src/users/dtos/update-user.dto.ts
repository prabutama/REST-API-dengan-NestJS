import { IsString, IsEmail, IsOptional } from "class-validator";

export class UpdateUSerDto {
    @IsString() @IsOptional()
    name: string;

    @IsEmail() @IsOptional()
    email: string;

    @IsString() @IsOptional()
    password: string;
}