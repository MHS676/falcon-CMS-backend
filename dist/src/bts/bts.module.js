"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BtsModule = void 0;
const common_1 = require("@nestjs/common");
const bts_controller_1 = require("./bts.controller");
const bts_service_1 = require("./bts.service");
let BtsModule = class BtsModule {
};
exports.BtsModule = BtsModule;
exports.BtsModule = BtsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bts_controller_1.BtsController],
        providers: [bts_service_1.BtsService],
    })
], BtsModule);
//# sourceMappingURL=bts.module.js.map