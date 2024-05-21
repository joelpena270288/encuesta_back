import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { DatabaseModule } from '../../database/database.module';
import { ClienteProviders } from './cliente.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [ClienteService,...ClienteProviders],
  exports:[ClienteService],
})
export class ClienteModule {}
