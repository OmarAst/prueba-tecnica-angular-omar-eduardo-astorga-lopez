import { Injectable } from '@angular/core';
import { ApiModuleService } from '../api-module.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/IApiResponse';
import { IGames, IGamesSerializer } from '../../interfaces/games/games';
import { IGamesDetails, IGamesDetailsSerializer } from '../../interfaces/games/gameDetail';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private games_api: ApiModuleService
  private detail_api: ApiModuleService

  private games_serializer: IGamesSerializer = new IGamesSerializer();
  private games_details_serializer: IGamesDetailsSerializer = new IGamesDetailsSerializer();


  constructor(public http: HttpClient) {
    this.games_api = new ApiModuleService(http, "games");
    this.detail_api = new ApiModuleService(http, "game");
  }

  consultarJuegos(params: Object): Observable<IApiResponse<IGames[]>> {
    return this.games_api.getResponse<IGames[]>(params,
      (datos) => datos.map(((item: any) => this.games_serializer.fromJson(item))));
  }

  consultarJuegosDetalle(params: Object): Observable<IApiResponse<IGamesDetails>> {
    return this.detail_api.getResponse<IGamesDetails>(params, (datos) => {
      return this.games_details_serializer.fromJson(datos);
    });
  }

}
