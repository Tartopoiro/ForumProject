import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserService} from "../../Services/user/user.service";

@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  //Constructeur du composant, injecte la dépendance UserService
  constructor(protected user:UserService) { }
}
