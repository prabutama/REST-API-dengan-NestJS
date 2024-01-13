import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUserService = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: UsersService,
        useValue: fakeUserService,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
