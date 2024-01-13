import { User } from "../users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Item { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    location: string;

    @Column()
    category: string;

    @Column({ default: false})
    approved: boolean;

    @ManyToOne(() => User, (user) => user.items)
    user: User;

    

}