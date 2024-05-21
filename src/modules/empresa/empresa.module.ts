import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { DatabaseModule } from '../../database/database.module';
import { EmpresaProviders } from './empresa.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [EmpresaController],
  providers: [EmpresaService,...EmpresaProviders],
  exports:[EmpresaService],
})
export class EmpresaModule {}
