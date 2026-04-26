import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BtsService } from './bts.service';

@Controller('bts')
export class BtsController {
  constructor(private readonly btsService: BtsService) {}

  @Get()
  findAll(
    @Query('district') district?: string,
    @Query('thana') thana?: string,
    @Query('siteType') siteType?: string,
    @Query('serviceType') serviceType?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.btsService.findAll({
      district,
      thana,
      siteType,
      serviceType,
      search,
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 50,
    });
  }

  @Get('districts')
  getDistricts() {
    return this.btsService.getDistricts();
  }

  @Get('districts/:district/thanas')
  getThanas(@Param('district') district: string) {
    return this.btsService.getThanasByDistrict(district);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.btsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.btsService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.btsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.btsService.remove(id);
  }
}
