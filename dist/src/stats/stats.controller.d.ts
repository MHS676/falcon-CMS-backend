import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
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
