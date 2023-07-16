import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from './home.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaModule } from './../prisma/prisma.module';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        HomeService,
        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
