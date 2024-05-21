import { Module } from '@nestjs/common';
import { CuentasEmpresaService } from './cuentas-empresa.service';
import { CuentasEmpresaController } from './cuentas-empresa.controller';
import { DatabaseModule } from '../../database/database.module';
import { CuentaEmpresaProviders } from './cuentas-empresa.providers';
import { EmpresaProviders } from '../empresa/empresa.providers';
import { MonedaProviders } from '../moneda/moneda.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CuentasEmpresaController],
  providers: [CuentasEmpresaService,...CuentaEmpresaProviders,...EmpresaProviders,...MonedaProviders],
  exports: [CuentasEmpresaService]
})
export class CuentasEmpresaModule {}
