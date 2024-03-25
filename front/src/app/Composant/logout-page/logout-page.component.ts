import { Component } from '@angular/core';
import {UserService} from "../../Services/user/user.service";

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [],
  templateUrl: './logout-page.component.html',
})
export class LogoutPageComponent {

  constructor(private userSerivce:UserService) {
    // Deconnexion du user
    this.userSerivce.logout()
  }

}
