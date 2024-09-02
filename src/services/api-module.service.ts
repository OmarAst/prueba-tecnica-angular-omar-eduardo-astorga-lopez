import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from './../enviroments/enviromets';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';
import { IApiResponse } from '../interfaces/IApiResponse';
import { IMetaSerializer } from '../interfaces/imeta.model';


@Injectable({
  providedIn: 'root'
})
export class ApiModuleService {

  private url: string;
  private metaSerializer: IMetaSerializer;

  constructor(
    private http: HttpClient,
    @Inject('MODULE_NAME') protected moduleName: string
  ) {
    this.url = `${environment.apiUrlBase}/api/${moduleName}`
    this.metaSerializer = new IMetaSerializer();

  }

  public getResponse<T>(params: any, mapper: (datos: any) => T): Observable<IApiResponse<T>> {
    debugger
    return this.http.get<any>(this.url, { params }).pipe(
      map((response) => Object.assign({
        exito: response.status === 0 ? false : true,
        data: mapper(response),
      })),
      catchError((err: HttpErrorResponse) => {
        this.handleError(err, 'getResponse', params);
        return EMPTY;
      })
    );
  }

  public getResponseID<T>(id: any, mapper: (datos: any) => T): Observable<IApiResponse<T>> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map((response) => Object.assign({
        exito: response.status === 0 ? false : true,
        data: mapper(response),
      })),
      catchError((err: HttpErrorResponse) => {
        this.handleError(err, 'getResponse', id);
        return EMPTY;
      })
    );
  }
  private handleError(err: HttpErrorResponse, methodName: string, params: any) {
    return throwError(`Error en ${this.url}`);
  }

}
