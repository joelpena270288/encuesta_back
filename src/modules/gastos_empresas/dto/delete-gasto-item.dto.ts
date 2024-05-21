import { IsString, IsInt, IsDate, IsBoolean,IsNotEmpty} from 'class-validator';
export class DeleteGastoItemDto {
@IsNotEmpty()
idgastoitem: string;


}
