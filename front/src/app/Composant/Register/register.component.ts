import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Utilisateur} from "../../Class/Utilisateur/utilisateur";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../Services/user/user.service";

@Component({
  selector: 'app-Register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  protected utilisateur:Utilisateur;

  constructor(private userService:UserService) {
    this.utilisateur = new Utilisateur({})
  }

  bInscription() {
    console.log(this.utilisateur)

    this.userService.inscription(this.utilisateur)
  }
}
