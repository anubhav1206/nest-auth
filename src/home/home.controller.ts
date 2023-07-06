import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto, HomeResponseDto, UpdateHomeDto } from './home.dto';
import { PropertyType } from '@prisma/client';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // home?city=Toronto&minPrice=5000&maxPrice=15000&propertyType=RESIDENTIAL
  @Get()
  async getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
  ): Promise<HomeResponseDto[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;
    const filters = {
      ...(city && { city }),
      ...(price && { price }),
      ...(propertyType && { propertyType }),
    };
    return await this.homeService.getHomes(filters);
  }

  @Get(':id')
  async getHome(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HomeResponseDto> {
    return await this.homeService.getHomeById(id);
  }

  @Post()
  async createHome(@Body() body: CreateHomeDto): Promise<HomeResponseDto> {
    return await this.homeService.createHome(body);
  }

  @Patch(':id')
  async updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateHomeDto,
  ): Promise<HomeResponseDto> {
    return await this.homeService.updateHomeById(id, body);
  }

  @Delete(':id')
  async deleteHome(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.homeService.deleteHomeById(id);
  }
}
