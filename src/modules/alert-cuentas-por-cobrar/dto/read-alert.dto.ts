import { Moment } from "moment";

export class ReadAlertDTO{
    consecutivo: number;
    creacion: Moment;
    acuerdo: number;
    dias: number;
    estado: string;
}