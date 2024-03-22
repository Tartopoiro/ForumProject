import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserService} from "../../Services/user/user.service";

@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(protected user:UserService) {
  }

}
