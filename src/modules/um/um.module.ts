import { Module } from '@nestjs/common';
import { UmService } from './um.service';
import { UmController } from './um.controller';
import { DatabaseModule } from '../../database/database.module';
import { UmProviders } from './um.providers';

@Module({
  controllers: [UmController],
  providers: [UmService,...UmProviders],
  imports: [DatabaseModule],
  exports: [UmService]
})
export class UmModule {}
