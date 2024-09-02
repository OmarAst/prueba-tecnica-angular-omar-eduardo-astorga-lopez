import { ISerializer } from './ISerializer';

export interface IMeta {
    status: string;
    count: number;
    mensaje: string;
}

export class IMetaSerializer implements ISerializer<IMeta> {

    fromJson(json: any): IMeta {
        return Object.assign({}, json,
            {
                status: json.status ? json.status.trim() : '',
                count: json.count ? parseInt(json.count, 10) : 0,
                mensaje: json.mensaje ? json.mensaje : '',
            });
    }

    toJson(item: IMeta): any {
        return {
            status: item.status,
            count: item.count,
            mensaje: item.mensaje,
        };

    }
}
