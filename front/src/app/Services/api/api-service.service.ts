import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Utilisateur} from "../../Class/Utilisateur/utilisateur";
import {Blog} from "../../Class/Blog/blog";

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})

export class ApiService {

  //apiUrl = 'https://jsonplaceholder.typicode.com';
  apiUrl = 'http://localhost:4200/api';

  constructor(private http:HttpClient) { }

  /***
   *
   *  User
   *
   ***/

  // Cette fonction récupère un utilisateur par son adresse email en utilisant une requête HTTP GET
  public getUserByEmail(mail: string){
    return this.http.get<any>(`${this.apiUrl}/user/?mail=${mail}`);
  }

  // Cette fonction crée un nouvel utilisateur en envoyant les données au serveur via une requête HTTP POST
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

  // Cette fonction met à jour un utilisateur existant en envoyant les données modifiées au serveur via une requête HTTP PATCH
  public updateUser(user: Utilisateur){
    let data = {
      Email:user.email,
      Nom: user.nom,
      Prenom: user.prenom,
      Numero: user.numero
    }

    return this.http.patch<any>(`${this.apiUrl}/user`,data);
  }

  // Cette fonction récupère tous les utilisateurs en envoyant une requête HTTP GET au serveur
  public getUsers(){
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  /***
   *
   * Blog
   *
   ***/

  // Cette fonction récupère un blog en fonction de son ID et de l'ID de l'utilisateur
  public getBlog(IdBlog: string, IdUser: number){

    let data = {
      IdUser: IdUser ? IdUser : 0,
      IdBlog: IdBlog
    }

    return this.http.post<any>(`${this.apiUrl}/getBlog`,data);
  }

  // Cette fonction crée un nouveau blog
  public createBlog(blog: Blog){
    // de _public --> Public
    //Permet cohérence avec l'API post

    //Public, Titre, Descriptif, IdUser
    let data = {
      Public:blog.Public ? 1 : 0,
      Titre: blog.Titre,
      Descriptif: blog.Descriptif,
      IdUser: blog.Id_Utilisateur
    }

    return this.http.post<any>(`${this.apiUrl}/blog`,data);
  }

  // Cette fonction met à jour un blog existant
  public updateBlog(blog: Blog){
    let data = {
      IdBlog:blog.Id_Blog,
      Public:blog.Public ? 1 : 0,
      Titre: blog.Titre,
      Descriptif: blog.Descriptif,
      IdUser: blog.Id_Utilisateur
    }

    return this.http.patch<any>(`${this.apiUrl}/blog`,data);
  }

  // Cette fonction supprime un blog en fonction de son ID
  public deleteBlog(id: string){
    return this.http.get<any>(`${this.apiUrl}/deleteblog?idblog=${id}`);
  }

  /***
   *
   * Blog - Message
   *
   ***/

  // Cette fonction récupère les messages d'un blog grâdce a son ID
  public getMessageByBlog(IdBlog: number){
    return this.http.get<any>(`${this.apiUrl}/message?idblog=${IdBlog}`);
  }

  // Cette fonction créer un message sur un blog
  public createMessage(idBlog: number,idUser:number,
                       titre:string,contenu:string){

    let data = {
      IdBlog: idBlog,
      IdUser: idUser,
      Titre: titre,
      Contenu: contenu
    }

    return this.http.post<any>(`${this.apiUrl}/message`,data);
  }

  /***
   *
   *  User & Blog ---> Verif/add/remove access to a blog
   *
   ***/

  // Cette fonction récupère les informations du blog d'un utilisateur en utilisant son identifiant.
  public getUserBlog(id: string){
    return this.http.get<any>(`${this.apiUrl}/userblog?iduser=${id}`);
  }

  // Cette fonction récupère les autorisations d'accès à un blog en utilisant l'identifiant du blog.
  public getAccessBlog(idblog: number){
    return this.http.get<any>(`${this.apiUrl}/acces?idblog=${idblog}`);
  }

  // Cette fonction crée une nouvelle autorisation d'accès à un blog en utilisant l'identifiant du blog et l'identifiant de l'utilisateur.
  public createAccessBlog(IdBlog: string, IdUser: number){

    if(IdUser === 0)
      return null

    let data = {
      IdUser: IdUser+"",
      IdBlog: IdBlog
    }

    return this.http.post<any>(`${this.apiUrl}/acces`,data);
  }

  // Cette fonction supprime l'autorisation d'accès à un blog en utilisant l'identifiant du blog et l'identifiant de l'utilisateur.
  public deleteAccessBlog(IdBlog: string, IdUser: number){

    let data = {
      IdUser: IdUser,
      IdBlog: IdBlog
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.http.delete<any>(`${this.apiUrl}/acces`,options);
  }

  /***
   *
   *  Get Blog by id user
   *
   ***/

  // Cette fonction récupère les blogs accessibles par un utilisateur donné
  public getBlogsByUser(iduser:number){

    if(iduser === undefined) iduser = 0

    return this.http.get<any>(`${this.apiUrl}/accessibleblog?iduser=${iduser}`);
  }

  /***
   *
   * API
   *
   ***/

  // Fonction asynchrone pour effectuer un appel à l'API (test de connexion)
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
