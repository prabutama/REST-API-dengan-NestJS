import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity'
import { Item } from './items/item.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
      type: 'sqlite',
      database: configService.get<string>('DB_NAME'),
      entities: [User, Item],
      synchronize: true,
      }) 
    }), 
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Item],
    //   synchronize: true,
    // }), 
    UsersModule, 
    ItemsModule, AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_PIPE',
    useValue: new ValidationPipe({
      whitelist: true,
    }),
  }], 
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({keys: ['b3l4j4rn35t'] })).forRoutes('*');
  }
}
