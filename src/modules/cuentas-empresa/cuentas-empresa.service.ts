import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuentasEmpresaDto } from './dto/create-cuentas-empresa.dto';
import { UpdateCuentasEmpresaDto } from './dto/update-cuentas-empresa.dto';
import { Repository } from 'typeorm';
import { Moneda } from '../moneda/entities/moneda.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { CuentasEmpresa } from './entities/cuentas-empresa.entity';

@Injectable()
export class CuentasEmpresaService {
   constructor(
    @Inject('CUENTAEMPRESA_REPOSITORY')
    private cuentaRepository: Repository<CuentasEmpresa>,
    @Inject('MONEDA_REPOSITORY')
    private monedaRepository: Repository<Moneda>,
    @Inject('EMPRESA_REPOSITORY')
    private empresaRepository: Repository<Empresa>,

  ) {}
async  create(createCuentasEmpresaDto: CreateCuentasEmpresaDto): Promise<CuentasEmpresa> {
    
 const foundMoneda: Moneda = await this.monedaRepository.findOne({where: {id: createCuentasEmpresaDto.idmoneda, status: Status.ACTIVO}});
 if(!foundMoneda){
  throw new NotFoundException("La moneda introducida no es correcta");
 }
 const founEmpresa: Empresa =  await this.empresaRepository.findOne({
  where: { idetificador: 'SIGLER' },
});
if(!founEmpresa){
  throw new NotFoundException("Error al buscar la empresa");
}
if(createCuentasEmpresaDto.banco === '' && createCuentasEmpresaDto.numerocuenta === ''){
  throw new BadRequestException("Debe introducir el nombre del banco y numero de cuenta");
}

const newCuenta: CuentasEmpresa = new CuentasEmpresa();
newCuenta.banco = createCuentasEmpresaDto.banco;
newCuenta.numerocuenta = createCuentasEmpresaDto.numerocuenta;
newCuenta.empresa = founEmpresa;
newCuenta.moneda = foundMoneda;
newCuenta.status = Status.ACTIVO;
return await this.cuentaRepository.save(newCuenta);
  }


 async findAll(): Promise<CuentasEmpresa[]> {
   
return await this.cuentaRepository.find({where: {status: Status.ACTIVO }});

  }

 async findOne(id: string): Promise<CuentasEmpresa> {
    return  await this.cuentaRepository.findOne({where:{id: id, status: Status.ACTIVO}});
  }

 async update(id: string, updateCuentasEmpresaDto: UpdateCuentasEmpresaDto): Promise<CuentasEmpresa> {
  
    const foundCuenta: CuentasEmpresa = await this.cuentaRepository.findOne({where: {id: id, status: Status.ACTIVO}});
   
    const foundMoneda: Moneda = await this.monedaRepository.findOne({where: {id: updateCuentasEmpresaDto.idmoneda, status: Status.ACTIVO}});
   if(!foundMoneda){
    throw new NotFoundException('No es valida la moneda introducida');
   }

    if(!foundCuenta){
      throw new NotFoundException('La cuenta introducida no es correcta');

      
    }

    foundCuenta.banco = updateCuentasEmpresaDto.banco;
      foundCuenta.numerocuenta = updateCuentasEmpresaDto.numerocuenta;
      foundCuenta.moneda = foundMoneda;
      return await this.cuentaRepository.save(foundCuenta);
  }

 async remove(id: string): Promise<CuentasEmpresa> {
    
    const foundCuenta: CuentasEmpresa = await this.cuentaRepository.findOne({where: {id: id, status: Status.ACTIVO}});
   if(!foundCuenta){
    throw new NotFoundException('No es valida la moneda introducida');
   }
   foundCuenta.status = Status.INACTIVO;
    return await this.cuentaRepository.save(foundCuenta);

  }
}
