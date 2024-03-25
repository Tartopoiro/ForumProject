import { Injectable } from '@angular/core';
import {ApiService} from "../api/api-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserFindService {

  // Déclaration d'une carte pour stocker les utilisateurs
  private listUser: Map<number, String> = new Map();

  constructor(private api:ApiService) {
    // Appel de la méthode pour mettre à jour la liste des utilisateurs lors de la création du service
    this.updateListeNom()
  }

  // Mise à jour de la liste des Noms/Prenomw concaténer
  public updateListeNom(){
    this.listUser.clear()

    this.api.getUsers().subscribe((data: any) => {

      if(data && data[0] && data[0][0]){

        data[0].forEach((aUser:{id_utilisateur:number, nom_complet:String}) => {
          if(aUser && aUser.id_utilisateur && aUser.nom_complet){
            this.listUser.set(aUser.id_utilisateur, aUser.nom_complet)
          }
        });

        // Debug
        //console.log(this.listUser)

      }
    })
  }

  // Retourne le nom/prenom depuis l'id de la Map
  public getNomComplet(id:number){

    let nomC = this.listUser.get(id)

    if(nomC === undefined) {
      this.updateListeNom()
      nomC = this.listUser.get(id)
    }

    return nomC;
  }

  // Retourne les résultats de la recherche du nom et/ou prenom avec la possibilité de supprimer des users
  public search(str: string, ignoredIds: number[], userId: number) {
    let result: Map<number, String> = new Map();

    if(str.length == 0){
      this.updateListeNom()
    }

    for (const [key, value] of this.listUser.entries()) {
      if (!ignoredIds.includes(key) && key != userId && value.toLowerCase().includes(str.toLowerCase())) {
        result.set(key, value);
      }
    }

    return result;
  }
}
