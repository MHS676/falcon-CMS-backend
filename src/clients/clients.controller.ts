import { Controller, Get, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('location') location?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.clientsService.findAll({
      search,
      location,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('all')
  findAllForMap() {
    return this.clientsService.findAllForMap();
  }

  @Get('locations')
  getLocations() {
    return this.clientsService.getLocations();
  }

  @Get('stats')
  getStats() {
    return this.clientsService.getStats();
  }
}
