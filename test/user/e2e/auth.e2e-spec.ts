import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserCommandModel } from '../../../src/users/infrastructure/models/user-command.model';
import { UserQueryModel } from '../../../src/users/infrastructure/models/user-query.model';
import { UsersModule } from '../../../src/users/users.module';
import * as mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'mongodb',
          url: 'mongodb://127.0.0.1:27017/todo-test',
          useUnifiedTopology: true,
          entities: [UserCommandModel, UserQueryModel],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    const mongoClient = new MongoClient('mongodb://127.0.0.1:27017');
    await mongoClient.connect();
    const db = mongoClient.db('todo-test');
    await db.dropDatabase();
    await app.close();
  });

  describe('POST /auth/signup', () => {
    it('should sign up a new user successfully', () => {
      const newUser = { username: 'john_doe', password: 'Password123!' };

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(newUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.username).toEqual(newUser.username);
          expect(res.body).toHaveProperty('token');
        });
    });

    // it('should return 400 for invalid data', () => {
    //   const invalidUser = { username: '', password: '123' };

    //   return request(app.getHttpServer())
    //     .post('/auth/signup')
    //     .send(invalidUser)
    //     .expect(400)
    //     .expect((res) => {
    //       expect(res.body).toHaveProperty('message');
    //     });
    // });

    it('should return 409 for duplicate username', async () => {
      const duplicateUser = {
        username: 'john_doe',
        password: 'Password123!',
      };

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(duplicateUser);

      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(duplicateUser)
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('Username already exists');
        });
    });
  });
});
