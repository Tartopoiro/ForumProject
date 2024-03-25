import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ApiService} from "../../Services/api/api-service.service";
import {UserService} from "../../Services/user/user.service";

@Component({
  selector: 'app-User-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-page.component.html'
})
export class UserPageComponent {
  // Déclaration d'une variable protégée profileM de type booléen, initialisée à true
  protected profileM:boolean = true;

  // Déclaration d'une variable protégée listeBlogs, un tableau de type any, mais non initialisée
  protected listeBlogs:any[];

  constructor(protected api:ApiService,
              protected user:UserService) {

    // Initialisation du tableau listeBlogs à un tableau vide
    this.listeBlogs = [];

    // Appel de la méthode getUserBlog de l'API avec l'ID de l'utilisateur pour récupérer les blogs associés à cet utilisateur
    this.api.getUserBlog(user.get_user.id_Utilisateur+"").subscribe((data:any) => {
      //console.log(data)

      // Vérifie si des données ont été renvoyées et si le premier élément est un tableau non vide
      if(data && data[0] && data[0][0]){
        // Si oui, assigne les blogs récupérés à la variable listeBlogs
        this.listeBlogs = data[0];
      }
    })
  }
}
