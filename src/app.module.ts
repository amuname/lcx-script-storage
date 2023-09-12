import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaServiceService } from './prisma-service/prisma-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScriptBuilderService } from './script-builder/script-builder.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSPORT',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ScriptBuilderService, PrismaServiceService],
})
export class AppModule {}
