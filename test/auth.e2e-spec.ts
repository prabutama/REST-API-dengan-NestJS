import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Auth Controller (e2e)', () => {
    let app: INestApplication;

beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        // setupApp(app);
        await app.init();
    });

it('handles register', () => {
    return request(app.getHttpServer())
        .post('/auth/register')
        .send({
            name: "jhoneo",
            email: "jhoneo@gmail.com",
            password: "jhoneo"
        })
        .expect(201)
        .then(({ body } : request.Response) => {
            expect(body.id).toBeDefined();
            expect(body.name).toBe('jhoneo');
            expect(body.email).toBe('jhoneo@gmail.com');
        });
    });
it('login after register', async () => {
    const email = 'jhoneo22p@gmail.com';
    const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({name: 'jhoneo', email, password: 'jhoneo'})
        .expect(201)
    const cookie = response.get('set-cookie');
        const  { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200)
            expect(body.email).toEqual(email)
    })
});
