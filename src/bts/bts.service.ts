import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface BtsFilter {
  district?: string;
  thana?: string;
  siteType?: string;
  serviceType?: string;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class BtsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: BtsFilter = {}) {
    const { district, thana, siteType, serviceType, search, page = 1, limit = 50 } = filter;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (district) where.district = { contains: district, mode: 'insensitive' };
    if (thana) where.thana = { contains: thana, mode: 'insensitive' };
    if (siteType) where.siteType = { contains: siteType, mode: 'insensitive' };
    if (serviceType) where.serviceType = { contains: serviceType, mode: 'insensitive' };

    if (search) {
      where.OR = [
        { airtelCode: { contains: search, mode: 'insensitive' } },
        { robiCode: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { district: { contains: search, mode: 'insensitive' } },
        { thana: { contains: search, mode: 'insensitive' } },
        { guardNames: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.bts.findMany({
        where,
        skip,
        take: limit,
        orderBy: { slNo: 'asc' },
      }),
      this.prisma.bts.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.prisma.bts.findUnique({ where: { id } });
  }

  async getDistricts() {
    const result = await this.prisma.bts.findMany({
      select: { district: true },
      distinct: ['district'],
      orderBy: { district: 'asc' },
      where: { district: { not: null } },
    });
    return result.map((r) => r.district).filter(Boolean);
  }

  async getThanasByDistrict(district: string) {
    const result = await this.prisma.bts.findMany({
      select: { thana: true },
      distinct: ['thana'],
      where: { district: { contains: district, mode: 'insensitive' }, thana: { not: null } },
      orderBy: { thana: 'asc' },
    });
    return result.map((r) => r.thana).filter(Boolean);
  }

  async create(data: any) {
    const maxSlNo = await this.prisma.bts.aggregate({ _max: { slNo: true } });
    const nextSlNo = (maxSlNo._max.slNo ?? 0) + 1;
    return this.prisma.bts.create({
      data: {
        slNo: nextSlNo,
        airtelCode: data.airtelCode || null,
        robiCode: data.robiCode || null,
        siteType: data.siteType || null,
        district: data.district || null,
        thana: data.thana || null,
        address: data.address || null,
        securityVendor: data.securityVendor || null,
        serviceType: data.serviceType || null,
        posts: data.posts ? parseInt(data.posts) : null,
        persons: data.persons ? parseInt(data.persons) : null,
        deploymentDate: data.deploymentDate || null,
        guardNames: data.guardNames || null,
        inchargeNames: data.inchargeNames || null,
        remarks: data.remarks || null,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.bts.update({
      where: { id },
      data: {
        airtelCode: data.airtelCode ?? undefined,
        robiCode: data.robiCode ?? undefined,
        siteType: data.siteType ?? undefined,
        district: data.district ?? undefined,
        thana: data.thana ?? undefined,
        address: data.address ?? undefined,
        securityVendor: data.securityVendor ?? undefined,
        serviceType: data.serviceType ?? undefined,
        posts: data.posts !== undefined ? (data.posts ? parseInt(data.posts) : null) : undefined,
        persons: data.persons !== undefined ? (data.persons ? parseInt(data.persons) : null) : undefined,
        deploymentDate: data.deploymentDate ?? undefined,
        guardNames: data.guardNames ?? undefined,
        inchargeNames: data.inchargeNames ?? undefined,
        remarks: data.remarks ?? undefined,
        latitude: data.latitude !== undefined ? (data.latitude ? parseFloat(data.latitude) : null) : undefined,
        longitude: data.longitude !== undefined ? (data.longitude ? parseFloat(data.longitude) : null) : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.bts.delete({ where: { id } });
  }
}
