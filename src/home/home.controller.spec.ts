import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

describe('HomeController', () => {
  let controller: HomeController;
  let homeService: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        {
          provide: HomeService,
          useValue: {
            getHomes: jest.fn().mockReturnValue([]),
          },
        },
        PrismaService,
        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
      ],
    }).compile();

    controller = module.get<HomeController>(HomeController);
    homeService = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(homeService).toBeDefined();
  });

  describe('getHomes', () => {
    it('should construct filter object correctly', async () => {
      // it doesn't matter what fn returns, arguments matter
      const mockGetHomes = jest.fn().mockReturnValue([]);
      jest.spyOn(homeService, 'getHomes').mockImplementation(mockGetHomes);

      await controller.getHomes('Toronto', '1500000');

      expect(mockGetHomes).toBeCalledWith({
        city: 'Toronto',
        price: {
          gte: 1500000,
        },
      });
    });
  });
});
