

import { Module } from '@nestjs/common';
import { RoleModule } from './modules/role/role.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { LogModule } from './modules/log/log.module';
import { VentaModule } from './modules/venta/venta.module';

import { VendedorModule } from './modules/vendedor/vendedor.module';
import { EncuestaModule } from './modules/encuesta/encuesta.module';

import { GrupoModule } from './modules/grupo/grupo.module';
import { CuestionarioModule } from './modules/cuestionario/cuestionario.module';
import { ColorModule } from './modules/color/color.module';
import { KpiModule } from './modules/kpi/kpi.module';

import { MarcaModule } from './modules/marca/marca.module';
import { ModeloModule } from './modules/modelo/modelo.module';
import { CompetenciaModule } from './modules/competencia/competencia.module';
import { ReportVentasModule } from './modules/report-ventas/report-ventas.module';
import { ReporteEncuestaModule } from './modules/reporte-encuesta/reporte-encuesta.module';










@Module({
   
 imports:[
       
    ConfigModule,
     DatabaseModule,
     UsersModule,
     RoleModule,    
     AuthModule, 
     
     LogModule,
    VentaModule, 
    VendedorModule,
    EncuestaModule,
    GrupoModule, 
    CuestionarioModule, 
    ColorModule, 
    KpiModule, 
    MarcaModule, 
    ModeloModule, 
    CompetenciaModule, ReportVentasModule, ReporteEncuestaModule  
    ]
})
export class AppModule {
 static port: number | string;
 constructor(private readonly _configService:ConfigService){
  AppModule.port = this._configService.get(Configuration.PORT);
 }
  
  
}

