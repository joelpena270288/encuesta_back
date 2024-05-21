import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';
import { CargoProviders } from './cargo.providers';
import { DatabaseModule } from '../../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [CargoController],
  providers: [CargoService,...CargoProviders],
  exports: [CargoService],
})
export class CargoModule {}
