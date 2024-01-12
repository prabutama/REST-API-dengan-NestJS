import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private itemsRepository: Repository<Item>) {}

    create(item: CreateItemDto, user: User) {
        const newItem = this.itemsRepository.create(item);
        newItem.user = user;
        return this.itemsRepository.save(newItem);
    }
}
