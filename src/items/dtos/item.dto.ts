import { Expose, Transform } from "class-transformer";

export class ItemDto {
    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    price: number;

    @Expose()
    location: string;

    @Expose()
    category: string;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number; 

}