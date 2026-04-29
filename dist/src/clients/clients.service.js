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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientsService = class ClientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const { search = '', location = '', page = 1, limit = 20 } = params;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
                { contactPerson: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (location)
            where.location = { contains: location, mode: 'insensitive' };
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
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map