import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class QueryItemDto {
    @IsString() 
    name: string;

    @IsString()
    location: string;

    @IsString()
    category: string;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    year: number
}