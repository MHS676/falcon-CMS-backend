import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { search?: string; location?: string; page?: number; limit?: number }) {
    const { search = '', location = '', page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { contactPerson: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (location) where.location = { contains: location, mode: 'insensitive' };

    const [data, total] = await Promise.all([
      this.prisma.client.findMany({ where, skip, take: limit, orderBy: { slNo: 'asc' } }),
      this.prisma.client.count({ where }),
    ]);

    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findAllForMap() {
    return this.prisma.client.findMany({ orderBy: { slNo: 'asc' } });
  }

  async getLocations() {
    const rows = await this.prisma.client.findMany({
      select: { location: true },
      distinct: ['location'],
      orderBy: { location: 'asc' },
    });
    return rows.map(r => r.location).filter(Boolean);
  }

  async getStats() {
    const [total, byLocation] = await Promise.all([
      this.prisma.client.count(),
      this.prisma.client.groupBy({ by: ['location'], _count: { id: true }, orderBy: { _count: { id: 'desc' } } }),
    ]);
    return { total, byLocation: byLocation.map(r => ({ location: r.location, count: r._count.id })) };
  }
}
