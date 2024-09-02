import { Routes } from '@angular/router';
import { GamesListComponent } from '../components/games-list/games-list.component';
import { AppComponent } from './app.component';
import { GamesDetailsComponent } from '../components/games-details/games-details.component';
import { NofoundComponent } from '../components/nofound/nofound.component';

export const routes: Routes = [
    { path: '', component: GamesListComponent, pathMatch: 'full' }, // Página inicial
    { path: 'game/:id', component: GamesDetailsComponent }, // Página de detalles del juego
    { path: '**', component: NofoundComponent } // Página 404
  ];