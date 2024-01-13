import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { User } from '../users/user.entity';
import { QueryItemDto } from './dtos/query-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private itemsRepository: Repository<Item>) {}

    getAllItems(QueryItemDto: QueryItemDto) {
        return this.itemsRepository
        .createQueryBuilder()
        .select('*')
        .where('approved: =approved', {approved: true})
        .getRawMany()
    }

    create(item: CreateItemDto, user: User) {
        const newItem = this.itemsRepository.create(item);
        newItem.user = user; 
        return this.itemsRepository.save(newItem);
    }

    async approveItem(id: number, approve: boolean) {
        const item = await this.itemsRepository.findOneBy({ id });
        if (!item) throw new NotFoundException('Item not found');
        item.approved = approve;
        return this.itemsRepository.save(item);
    }
}
