import { Module } from '@nestjs/common';
import { GastoItemService } from './gasto_item.service';
import { GastoItemController } from './gasto_item.controller';

@Module({
  controllers: [GastoItemController],
  providers: [GastoItemService],
})
export class GastoItemModule {}
