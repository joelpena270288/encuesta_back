import { Module } from '@nestjs/common';
import { CombustibleService } from './combustible.service';
import { CombustibleController } from './combustible.controller';
import { DatabaseModule } from '../../database/database.module';
import { CombustibleProviders } from './combustible.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [CombustibleController],
  providers: [CombustibleService,...CombustibleProviders],
  exports: [CombustibleService],
})
export class CombustibleModule {}
