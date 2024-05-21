import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { MaterialProviders } from './material.providers';
import { DatabaseModule } from '../../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [MaterialController],
  providers: [MaterialService, ...MaterialProviders],
  exports:[MaterialService]
})
export class MaterialModule {}
