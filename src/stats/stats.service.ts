import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const [total, byDistrict, bySiteType, byServiceType, totalPersons] =
      await Promise.all([
        this.prisma.bts.count(),
        this.prisma.bts.groupBy({
          by: ['district'],
          _count: { id: true },
          orderBy: { _count: { id: 'desc' } },
          where: { district: { not: null } },
        }),
        this.prisma.bts.groupBy({
          by: ['siteType'],
          _count: { id: true },
          where: { siteType: { not: null } },
        }),
        this.prisma.bts.groupBy({
          by: ['serviceType'],
          _count: { id: true },
          where: { serviceType: { not: null } },
        }),
        this.prisma.bts.aggregate({
          _sum: { persons: true },
        }),
      ]);

    const districts = byDistrict.map((d) => ({
      district: d.district,
      count: d._count.id,
    }));

    return {
      totalSites: total,
      totalPersons: totalPersons._sum.persons || 0,
      totalDistricts: districts.length,
      byDistrict: districts,
      bySiteType: bySiteType.map((s) => ({
        type: s.siteType,
        count: s._count.id,
      })),
      byServiceType: byServiceType.map((s) => ({
        type: s.serviceType,
        count: s._count.id,
      })),
    };
  }
}
