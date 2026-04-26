import { PrismaService } from '../prisma/prisma.service';
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        totalSites: number;
        totalPersons: number;
        totalDistricts: number;
        byDistrict: {
            district: string;
            count: number;
        }[];
        bySiteType: {
            type: string;
            count: number;
        }[];
        byServiceType: {
            type: string;
            count: number;
        }[];
    }>;
}
