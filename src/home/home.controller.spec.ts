import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

describe('HomeController', () => {
  let controller: HomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        HomeService,
        PrismaService,
        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
      ],
    }).compile();

    controller = module.get<HomeController>(HomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
