import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nofound',
  standalone: true,
  imports: [],
  templateUrl: './nofound.component.html',
  styleUrl: './nofound.component.scss'
})
export class NofoundComponent {

  constructor(private router: Router) {

  }
  backhome() {
    this.router.navigate(['/']);
  }

}
