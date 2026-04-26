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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtsController = void 0;
const common_1 = require("@nestjs/common");
const bts_service_1 = require("./bts.service");
let BtsController = class BtsController {
    constructor(btsService) {
        this.btsService = btsService;
    }
    findAll(district, thana, siteType, serviceType, search, page, limit) {
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
    getDistricts() {
        return this.btsService.getDistricts();
    }
    getThanas(district) {
        return this.btsService.getThanasByDistrict(district);
    }
    findOne(id) {
        return this.btsService.findOne(id);
    }
    create(body) {
        return this.btsService.create(body);
    }
    update(id, body) {
        return this.btsService.update(id, body);
    }
    remove(id) {
        return this.btsService.remove(id);
    }
};
exports.BtsController = BtsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('district')),
    __param(1, (0, common_1.Query)('thana')),
    __param(2, (0, common_1.Query)('siteType')),
    __param(3, (0, common_1.Query)('serviceType')),
    __param(4, (0, common_1.Query)('search')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], BtsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('districts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BtsController.prototype, "getDistricts", null);
__decorate([
    (0, common_1.Get)('districts/:district/thanas'),
    __param(0, (0, common_1.Param)('district')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BtsController.prototype, "getThanas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BtsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BtsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BtsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BtsController.prototype, "remove", null);
exports.BtsController = BtsController = __decorate([
    (0, common_1.Controller)('bts'),
    __metadata("design:paramtypes", [bts_service_1.BtsService])
], BtsController);
//# sourceMappingURL=bts.controller.js.map