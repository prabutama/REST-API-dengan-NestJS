import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeAuthService: Partial<AuthService>
  beforeEach(async () => {
    fakeAuthService = {
      login: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      register: (name: string, email: string, password: string) => {
        return Promise.resolve({ id: 1, name, email, password} as User); 
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should a return user logiin', async () => {
  const session = { userId: 20 };
  const user = await controller.login({ email: 'jhon@gmail.com', password: 'jhon' }, session);
  expect(user).toEqual({ id: 1, email: 'jhon@gmail.com', password: 'jhon' });
  expect(session.userId).toEqual(1);
  });

  it('should a return user register', async () => {
    const session = { userId: 0 };
    const user = await controller.register({ name: 'jhon', email: 'jhon@gmail.com', password: 'jhon' }, session);
    session.userId = user.id;
    expect(user).toBeDefined();
    expect(user).toEqual({id: 1, name: 'jhon', email: 'jhon@gmail.com', password: 'jhon'});
    expect(session.userId).toEqual(user.id)
  })
});
