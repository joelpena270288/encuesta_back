import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';

export class ConvertFacturaDto {
    @IsInt()
    idncf: number;
	@IsNotEmpty()
	idmoneda: string;
    @IsNotEmpty()
    tipopago: string;
    @IsInt()
    dias: number;
	


}
