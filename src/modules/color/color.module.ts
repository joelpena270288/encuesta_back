import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { DatabaseModule } from '../../database/database.module';
import { ColorProviders } from './color.providers';
import {LogProviders} from '../log/log.providers'
@Module({
  imports: [DatabaseModule],
  controllers: [ColorController],
  providers: [ColorService,...ColorProviders,...LogProviders],
  exports: [ColorService]
})
export class ColorModule {}
