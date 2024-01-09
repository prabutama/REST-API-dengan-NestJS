import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity'
import { Item } from './items/item.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Item],
      synchronize: true,
    }), 
    UsersModule, 
    ItemsModule, AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
