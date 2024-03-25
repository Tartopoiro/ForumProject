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

// Définition de la classe RegisterComponent
export class RegisterComponent {

  // Propriété pour stocker les données de l'utilisateur
  protected utilisateur:Utilisateur;

  // Propriété pour indiquer s'il y a une erreur
  error:boolean = false

  constructor(private user: UserService,
              private userService:UserService) {
    // Initialisation de l'objet utilisateur avec un nouvel objet de type Utilisateur
    this.utilisateur = new Utilisateur({})
  }

  // Méthode asynchrone pour gérer l'inscription de l'utilisateur
  async bInscription() {
    //console.log(this.utilisateur)

    // Appel de la méthode inscription du service UserService pour inscrire l'utilisateur
    await this.userService.inscription(this.utilisateur);

    // Attente de 100 millisecondes
    await new Promise(r => setTimeout(r, 100));

    // Vérification si l'utilisateur est connecté après l'inscription
    if (!this.user.isConnected()) {
      // S'il n'est pas connecté, définir l'erreur sur true
      this.error = true
    }
  }
}
