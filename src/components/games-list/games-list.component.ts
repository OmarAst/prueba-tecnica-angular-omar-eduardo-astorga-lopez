import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GamesService } from '../../services/games/games.service';
import { IGames } from '../../interfaces/games/games'
import { catchError, filter, from, of, toArray } from 'rxjs';
import { ItemGameComponent } from '../item-game/item-game.component';
import { CommonModule } from '@angular/common';
import { MultipleSelectComponent } from '../multiple-select/multiple-select.component';
import { FormsModule } from '@angular/forms';
import { Ifiltros } from '../../interfaces/filtros';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [ ItemGameComponent, MultipleSelectComponent, CommonModule, FormsModule],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamesListComponent implements OnInit {

  public loadingData = true;

  public games: IGames[] = [];
  public paginatedGames: any[] = []; // Juegos que se mostrarán en la página actual 
  public currentPage: number = 1; // Página actual
  public pageSize: number = 15; // Número de elementos por página
  public generos: string[] = [];
  public plataform: string[] = [];
  originalGames: any;
  txtfiltroNombre: string = '';

  selectedGeneros: string[] = [];
  selectedPlataformas: string[] = [];

  // orden filtro
  // public orden = [{ value: 'alphabetical', label: 'Alfabeto' },
  // { value: 'release-date', label: 'Fecha' }]

  constructor(
    private renderer: Renderer2,
    private svGames: GamesService,
    private el: ElementRef
  ) {

  }

  public ngOnInit() {

    const params = {}
    this.consultarJuegos(params);
  }

  consultarJuegos(parametros: Object): void {
    this.loadingData = true;

    this.svGames.consultarJuegos(parametros)
      .pipe(
        catchError((error) => {
          this.loadingData = false;
          return of([]); // Retorna un observable vacío para manejar el error
        })
      )
      .subscribe(
        (rep: any) => {
          if (rep.exito === true) {
            if (this.generos.length === 0 || this.plataform.length === 0) {
              this.generos = [...new Set<string>(rep.data.map((item: IGames) => item.genre))];

              this.plataform = [
                ...new Set<string>(
                  rep.data
                    .flatMap((item: IGames) => item.platform.split(",").map((p) => p.trim()))
                ),
              ];
            }

            this.loadingData = false;
            this.games = rep.data;
            this.originalGames = rep.data;
            this.paginate();
          } 
        }
      );
  }

  buscarConFiltros() {

    const filteredGames = this.originalGames.filter((x: IGames) => {
      // Convertir los filtros a minúsculas para comparación
      const filtroNombre = this.txtfiltroNombre.toLowerCase().trim();
      const generosSeleccionados = this.selectedGeneros.map(genre => genre.toLowerCase());
      const plataformasSeleccionadas = this.selectedPlataformas.map(plataform => plataform.toLowerCase());
    
      // Condición para nombre
      const nombreCoincide = filtroNombre === '' || x.title.toLowerCase().includes(filtroNombre);
    
      // Condición para géneros
      const generosCoinciden = this.selectedGeneros.length === 0 || 
        this.selectedGeneros.some(genre =>
          x.genre.split(',').map(g => g.trim().toLowerCase()).includes(genre.toLowerCase())
        );
    
      // Condición para plataformas
      const plataformasCoinciden = this.selectedPlataformas.length === 0 || 
        this.selectedPlataformas.some(plataform =>
          x.platform.split(',').map(p => p.trim().toLowerCase()).includes(plataform.toLowerCase())
        );
    
      // Devolver verdadero si se cumple al menos una condición
      return nombreCoincide && generosCoinciden && plataformasCoinciden;
    });

    this.games = filteredGames;
    this.paginate()

  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedGames = this.games.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.renderer.setProperty(
      this.el.nativeElement.ownerDocument.documentElement,
      'scrollTop',
      0
    );
    this.paginate();
  }

  totalPages(): number {
    return Math.ceil(this.games.length / this.pageSize);
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages();
    const range = 3; // Número de páginas a mostrar antes y después de la página actual

    // Calcula los límites de la página a mostrar
    let start = Math.max(1, this.currentPage - range);
    let end = Math.min(totalPages, this.currentPage + range);

    // Ajusta el rango si hay menos páginas que el rango
    if (this.currentPage - range < 1) {
      end = Math.min(totalPages, end + (range - (this.currentPage - 1)));
    }
    if (this.currentPage + range > totalPages) {
      start = Math.max(1, start - ((this.currentPage + range) - totalPages));
    }

    const pageNumbers: number[] = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  onSelectedGenerosChange(options: string[]) {
    this.selectedGeneros = options;
  }

  onSelectedPlataformChange(options: string[]) {
    this.selectedPlataformas = options;
  }


  // selecionarOrden($event: Event) {
  //   let selectElement = $event.target as HTMLSelectElement;
  //   let selectedOptions = selectElement.value
  // }

}
