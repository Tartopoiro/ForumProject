import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Utilisateur} from "../../Class/Utilisateur/utilisateur";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../Services/user/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-Register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  protected utilisateur:Utilisateur;

  error:boolean = false

  constructor(private user: UserService,
              private userService:UserService) {
    this.utilisateur = new Utilisateur({})
  }

  async bInscription() {
    console.log(this.utilisateur)

    await this.userService.inscription(this.utilisateur);

    await new Promise(r => setTimeout(r, 100));

    if (!this.user.isConnected()) {
      this.error = true
    }
  }
}
