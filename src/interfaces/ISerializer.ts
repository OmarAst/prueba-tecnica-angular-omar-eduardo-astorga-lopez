export interface ISerializer<T> {
    fromJson(json: any): T;
    toJson(item: T): any;
}
