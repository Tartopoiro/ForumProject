import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-btn-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './btn-nav.component.html',
  styleUrl: './btn-nav.component.css'
})
export class BtnNavComponent {
  @Input() route = "";
  @Input() text = "";
}
