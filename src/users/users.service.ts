import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    find(email: string){
        return this.usersRepository.find({
            where: {
                email: email
            }
        });
    }

    create(name: string, email: string, password: string) {
        const user = this.usersRepository.create({name, email, password});
        return this.usersRepository.save(user);
    }

    async findOneBy(id: number) {
        if(!id) throw new NotFoundException('User not found');
        const user = await this.usersRepository.findOneBy({ id });
        if(!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOneBy(id);
        Object.assign(user, attrs);
        return await this.usersRepository.save(user);
}


    async remove(id: number) {
        const user = await this.findOneBy(id);
        this.usersRepository.remove(user);
    }

}