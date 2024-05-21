import { Module } from '@nestjs/common';
import { GastosEmpresasService } from './gastos_empresas.service';
import { GastosEmpresasController } from './gastos_empresas.controller';
import { DatabaseModule } from '../../database/database.module';
import { GastoEmpresaProviders } from './gastos_empresas.providers';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
import { GastoItemProviders } from '../gasto_item/gasto_item.providers';
import { EquipoProviders } from '../equipos/equipos.providers';
import { ProvedorProviders } from '../provedor/provedor.providers';
import { B11Providers } from '../b11/b11.providers';
import { MonedaProviders } from '../moneda/moneda.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [
    GastosEmpresasController
   
  ],
  providers: [GastosEmpresasService, ...GastoEmpresaProviders,
    ...ProyectoProviders,...GastoItemProviders,...EquipoProviders,...ProvedorProviders,...B11Providers,...MonedaProviders],
  exports: [GastosEmpresasService],
})
export class GastosEmpresasModule {}
