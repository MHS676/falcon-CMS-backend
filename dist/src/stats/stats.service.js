"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StatsService = class StatsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary() {
        const [total, byDistrict, bySiteType, byServiceType, totalPersons] = await Promise.all([
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
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatsService);
//# sourceMappingURL=stats.service.js.map