import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { DatabaseModule } from '../../database/database.module';
import { EmpleadoProviders } from './empleado.providers';
import { CargoProviders } from '../cargo/cargo.providers';
import { EmpresaProviders } from '../empresa/empresa.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [EmpleadoController],
  providers: [EmpleadoService, ...EmpleadoProviders, ...CargoProviders, ...EmpresaProviders],
  exports: [EmpleadoService],
})
export class EmpleadoModule {}
