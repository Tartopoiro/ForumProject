import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../../Class/Utilisateur/utilisateur";

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})

export class ApiService {

  //apiUrl = 'https://jsonplaceholder.typicode.com';
  apiUrl = 'http://localhost:4200/api';

  constructor(private http:HttpClient) { }

  /*getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }*/

  public getUserByEmail(mail: string){
    return this.http.get<any>(`${this.apiUrl}/user/?mail=${mail}`);
  }

  public createUser(user: Utilisateur){
    // de _email --> Email
    //Permet cohérence avec l'API get
    let data = {
      Email:user.email,
      Nom: user.nom,
      Prenom: user.prenom,
      Numero: user.numero
    }

    return this.http.post<any>(`${this.apiUrl}/user`,data);
  }

  public updateUser(user: Utilisateur){
    let data = {
      Email:user.email,
      Nom: user.nom,
      Prenom: user.prenom,
      Numero: user.numero
    }

    return this.http.patch<any>(`${this.apiUrl}/user`,data);
  }


  async apiWork() {
    try {
      let result = await this.http.get<any>(`${this.apiUrl}/`).toPromise();
      //console.log(result);

      let statusCo = false;

      if (result.message === 'test ok') {
        console.log("Connecté à l'API");
        statusCo = true;
      } else {
        console.log("API non fonctionnelle");
      }

      return statusCo;
    } catch (e) {
      console.log("Erreur lors de l'appel à l'API :", e);
      return false;
    }
  }


}
