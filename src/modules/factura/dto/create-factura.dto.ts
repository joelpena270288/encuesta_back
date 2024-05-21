import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
import {PreFactura} from '../../pre-factura/entities/pre-factura.entity';
export class CreateFacturaDto {
    @IsNotEmpty()
    idProyecto: string;
    prefacturas: PreFactura[];


}
