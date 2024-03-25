import { Injectable } from '@angular/core';
import {ApiService} from "../api/api-service.service";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class FindBlogService {

  // Déclaration d'un tableau privé pour stocker les blogs
  private listBlog:{
    Id_Blog: number;
    Titre: string;
    Id_Utilisateur: number;
    DateCreation: string;
    Public: number;
    Descriptif: string
  }[] = []

  constructor(private user:UserService, private api:ApiService) {

    // Chargement initial de la barre de recherche
    this.loadSearchBar()
  }

  // Fonction asynchrone pour charger la barre de recherche
  private async loadSearchBar() {
    //Attente de connexion au user en cas de besoin
    while (this.user.isloading()) {
      //console.log("Loading ....")
      await new Promise(r => setTimeout(r, 10));
    }

    // Mise à jour des blogs une fois que l'utilisateur est chargé
    this.updateBlogs()
  }

  // Fonction publique asynchrone pour mettre à jour les blogs
  public async updateBlogs(){
    this.api.getBlogsByUser(this.user.get_user.id_Utilisateur).subscribe((data: any) => {

      if(data && data[0]){
        // Debug
        //console.log(data[0])

        this.listBlog = data[0]
      }
    });
  }

  // Fonction de recherche de blogs en fonction d'une chaîne de caractères
  public search(str: string) {
    let result: Map<number, String> = new Map();

    if(str.length == 0){
      this.updateBlogs()
      return result
    }

    for (let array of this.listBlog) {
      if (array.Titre.toLowerCase().includes(str.toLowerCase())) {
        result.set(array.Id_Blog, array.Titre);
      }
    }

    return result;
  }
}
