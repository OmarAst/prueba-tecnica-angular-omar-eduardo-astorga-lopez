import { IMeta } from './imeta.model';

export interface IApiResponse<T> {
    exito: boolean;
    meta: IMeta;
    data: T;
}
