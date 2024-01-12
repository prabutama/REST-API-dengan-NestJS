import { Exclude } from "class-transformer";
import { Item } from "../items/item.entity";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column() @Exclude()
    password: string;

    @OneToMany(() => Item, (item) => item.user)
    items: Item[];

    @AfterInsert()
    logInsert() {
        console.log('Successfully inserted users id : ' + this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Successfully updated users id : ' + this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Successfully removed users id : ' + this.id);
    }

}