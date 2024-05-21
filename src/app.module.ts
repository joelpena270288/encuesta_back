

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
import { VehiculoModule } from './modules/vehiculo/vehiculo.module';
import { VendedorModule } from './modules/vendedor/vendedor.module';
import { EncuestaModule } from './modules/encuesta/encuesta.module';
import { PreguntaModule } from './modules/pregunta/pregunta.module';
import { GrupoModule } from './modules/grupo/grupo.module';
import { CuestionarioModule } from './modules/cuestionario/cuestionario.module';
import { RespuestaModule } from './modules/respuesta/respuesta.module';








@Module({
   
 imports:[
       
    ConfigModule,
     DatabaseModule,
     UsersModule,
     RoleModule,    
     AuthModule, 
     
     LogModule, VentaModule, VehiculoModule, VendedorModule, EncuestaModule, PreguntaModule, GrupoModule, CuestionarioModule, RespuestaModule,  
    ]
})
export class AppModule {
 static port: number | string;
 constructor(private readonly _configService:ConfigService){
  AppModule.port = this._configService.get(Configuration.PORT);
 }
  
  
}

