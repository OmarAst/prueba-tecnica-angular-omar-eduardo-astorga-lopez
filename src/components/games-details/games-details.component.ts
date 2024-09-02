import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games/games.service';
import { catchError, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IGamesDetails } from '../../interfaces/games/gameDetail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-games-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-details.component.html',
  styleUrl: './games-details.component.scss'
})
export class GamesDetailsComponent implements OnInit {
  loadingData: boolean = false;
  public sub: any;
  public game?: IGamesDetails | undefined;

  constructor(private svGames: GamesService,
    private route: ActivatedRoute

  ) {
  }
  ngOnInit(): void {

    this.sub = this.route.params.subscribe(async (parametros) => {

      this.loadingData = true;
      this.svGames.consultarJuegosDetalle({ id: parametros['id'] })
        .pipe(
          catchError((error) => {
            return of([]); // Retorna un observable vacío para manejar el error
          })
        )
        .subscribe(
          (rep: any) => {
            this.game = rep.data;
          }
        );
    })



  }

}
