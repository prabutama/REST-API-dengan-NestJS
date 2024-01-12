import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    fakeUsersService = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: UsersService,
        useValue: fakeUsersService,
      }],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
