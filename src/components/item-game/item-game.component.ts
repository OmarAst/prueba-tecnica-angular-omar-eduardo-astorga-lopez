import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'item-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-game.component.html',
  styleUrl: './item-game.component.scss'
})
export class ItemGameComponent {

  constructor(private router: Router) {

  }

  @Input() id: string = '';
  @Input() name: string = '';
  @Input() image: string = '';
  @Input() short_description: string = '';
  @Input() genre: string = '';
  @Input() platform: string = '';
  public isVisible: boolean = false;
  public loading?: boolean = true;
  backupImage: string = "";

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.backupImage; // Cambia la URL de la imagen a la de respaldo
    this.loading = false; // Oculta el skeleton loader en caso de error
  }

  onImageLoad() {
    this.loading = false; // Oculta el skeleton loader cuando la imagen carga
  }

  masdetalles(id: string) {
    this.router.navigate([`game/${id}`]);
    // this.router.navigateByUrl([¿'/game', id]);
  }
}
