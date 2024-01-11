import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const user = users.filter((user) => user.email === email);
        return Promise.resolve(user);
      },
      create: (name: string, email:string, password:string) => {
        const user = { 
          id: Math.floor(Math.random() * 999),
          name, 
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: UsersService,
        useValue: fakeUsersService,
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user', async () => {
    const user = await service.register('jhondoe', 'jhon@gmail.com', 'jhon');
    expect(user.password).not.toEqual('jhon')
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
    // console.log(user);
  });

  it('should fail to create user with an existing email', async () => {
    await service.register('jhondoe', 'jhon@gmail.com', 'jhon');
    await expect(service.register('jhondoe', 'jhon@gmail.com', 'jhon')).rejects.toThrow('Email sudah terdaftar')
  });

  it('should fail if user login with invalid email', async () => {
    await expect(service.login('admin@gmail.com', 'admin')).rejects.toThrow('Email tidak terdaftar');
  });

  it('should fail if user login with invalid password', async () => {
    await service.register('jhondoe', 'jhon@gmail.com', 'jhon');
    await expect(service.login('jhon@gmail.com', 'admin')).rejects.toThrow('Password salah');
  });

  it('should login existing user', async () => {
    await service.register('jhon', 'jhon@gmail.com', 'jhon');
    await expect(service.login('jhon@gmail.com', 'jhon')).toBeDefined();
  });
});
