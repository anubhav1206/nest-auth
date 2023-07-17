import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from './home.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { PropertyType } from '@prisma/client';

const mockGetHomes = [
  {
    id: 1,
    address: '2345 William Str',
    city: '2Toronto',
    price: 1500000,
    propertyType: PropertyType.RESIDENTIAL,
    image: 'img1',
    numberOfBedrooms: 3,
    numberOfBathrooms: 2.5,
    images: [
      {
        url: 'src1',
      },
    ],
  },
];

describe('HomeService', () => {
  let service: HomeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: PrismaService,
          useValue: {
            home: {
              findMany: jest.fn().mockReturnValue(mockGetHomes),
            },
          },
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('getHomes', () => {
    const filters = {
      city: 'Toronto',
      price: {
        gte: 1000000,
        lte: 1500000,
      },
      propertyType: PropertyType.RESIDENTIAL,
    };

    it('should call prisma home.findMany with correct params', async () => {
      // return mock data
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue(mockGetHomes);

      // listen on every prismaService.home.findMant() call
      // intercept it with mockPrismaFindManyHomes which returns mock data
      jest
        .spyOn(prismaService.home, 'findMany')
        .mockImplementation(mockPrismaFindManyHomes);

      // actually test the service with mock filters
      await service.getHomes(filters);
      // service is intercepted, and mockPrismaFindManyHomes() is called

      // expect to be called like this:
      expect(mockPrismaFindManyHomes).toBeCalledWith({
        select: {
          id: true,
          address: true,
          city: true,
          price: true,
          property_type: true,
          number_of_bathrooms: true,
          number_of_bedrooms: true,
          images: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
        where: filters,
      });
    });

    it('should throw not found exception if no homes are found', async () => {
      // return empty array
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue([]);

      // listen on every prismaService.home.findMant() call
      // intercept it with mockPrismaFindManyHomes which returns an empty array
      jest
        .spyOn(prismaService.home, 'findMany')
        .mockImplementation(mockPrismaFindManyHomes);

      // actually test the service with mock filters
      await expect(service.getHomes(filters)).rejects.toThrowError(
        NotFoundException,
      );
      // service is intercepted, and mockPrismaFindManyHomes() is called
    });
  });
});
