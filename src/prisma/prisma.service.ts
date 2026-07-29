import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: ['warn', 'error'],
    });
  }

  async onModuleInit() {
    const maxRetries = 5;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.$connect();
        this.logger.log('Database connected successfully');
        return;
      } catch (err) {
        this.logger.warn(`DB connect attempt ${attempt}/${maxRetries} failed: ${err.message}`);
        if (attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, 3000 * attempt));
        } else {
          this.logger.error('Could not connect to database after all retries — queries will fail until DB is reachable');
        }
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
