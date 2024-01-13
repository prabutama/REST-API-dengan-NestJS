import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guard/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/Serialize.interceptor';
import { ItemDto } from './dtos/item.dto';
import { ApproveItemDto } from './dtos/approve-item.dto';
import { AdminGuard } from '../guard/admin.guard';
import { QueryItemDto } from './dtos/query-item.dto';

@Controller('items')
@Serialize(ItemDto)
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @Get()
    getAllItems(@Query() query: QueryItemDto) {
        return this.itemsService.getAllItems(query);
    }

    @Post() 
    @UseGuards(AuthGuard)
    createItem(@Body() body: CreateItemDto, @CurrentUser() user: User) {
        return this.itemsService.create(body, user);
    }

    @Patch('/:id') 
    @UseGuards(AdminGuard)
    approveItem(@Param('id') id: string, @Body() body: ApproveItemDto) {
        return this.itemsService.approveItem(parseInt(id), body.approved);
    }
}

