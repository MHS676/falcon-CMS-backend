"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data = require("./seed-clients.json");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.client.deleteMany();
    const result = await prisma.client.createMany({ data: data });
    console.log(`Seeded ${result.count} clients`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=seed-clients.js.map