import { Injectable } from '@angular/core';
import {ApiService} from "../api/api-service.service";
import {Utilisateur} from "../../Class/Utilisateur/utilisateur";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Indique si l'utilisateur est connecté
  private connected: boolean = false;
  // Indique si une opération est en cours de chargement
  private loading : boolean = false;

  // Contient les informations de l'utilisateur connecté, s'il y en a un
  private user: Utilisateur | undefined;

  constructor(private api:ApiService, private router:Router) {
    // Obtenir la date actuelle
    const currentDate = new Date();

    //Recup info localStorage
    let dateStr = localStorage.getItem("dateCo") || undefined
    let email = localStorage.getItem("email") || undefined

    // Vérification si des informations de connexion sont présentes et si la dernière connexion est récente
    if(email != undefined && dateStr != undefined){
      // Timeout en minute entre heure actuelle <-> heure de dernière connexion
      const differenceInMinutes = Math.abs((currentDate.getTime() - parseInt(dateStr)) / (1000 * 60));

      // Si la différence est inférieure à 30 minutes, l'utilisateur est automatiquement connecté
      if(differenceInMinutes < 30 ) this.connexion(email,false)
      else console.log("Timeout connexion ( > 30 min)")
      // Sinon, l'utilisateur n'est pas automatiquement connecté
    }
  }

  // Méthode de connexion de l'utilisateur
  public async connexion(mail: string, redirect: boolean) {
    this.loading = true;
    if (await this.api.apiWork()) {
      this.api.getUserByEmail(mail).subscribe((data: any) => {
        //console.log(data);
        if(data && data[0] && data[0][0]){
          this.user = new Utilisateur(data[0][0]);
          this.connected = true

          if(redirect)
            this.router.navigateByUrl("/");
          console.log("Connecté !")

          localStorage.setItem("email", mail);
          localStorage.setItem("dateCo", String(Date.now()))

          //Debug
          //console.log(this)

        }else{
          console.log("user introuvable !")
          this.connected = false
        }
        this.loading = false;
      })
    }
  }

  // Méthode d'inscription d'un nouvel utilisateur
  public async inscription(utilisateur: Utilisateur) {
    this.loading = true;
    if (await this.api.apiWork()) {
      this.api.createUser(utilisateur).subscribe( {
        next: (data: any) => {
          // Debug
          //console.log(data)

          this.connexion(utilisateur.email, false)
          this.connected = true

          this.router.navigateByUrl("/")
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur HTTP :', error.status);
          this.connected = false;
        }
      })
    }

    this.loading = false;
    return this.connected;
  }

  // Méthode de mise à jour du profil utilisateur
  public async mettreAJourProfil(utilisateur: Utilisateur){
    if (await this.api.apiWork()) {
      this.api.updateUser(utilisateur).subscribe((data: any) => {
        //console.log(data);

        if(data.message && data.message == "User created"){

          if(this.user?.id_Utilisateur)
            utilisateur.id_Utilisateur = this.user?.id_Utilisateur

          // Debug
          //console.log(utilisateur)

          this.user = utilisateur;

          this.router.navigateByUrl('profile')
        }
      })
    }
  }

  // Méthode pour vérifier si un utilisateur est connecté
  public isConnected(){
    return this.connected;
  }

  // Méthode pour vérifier si une opération est en cours de chargement
  public isloading(){
    return this.loading;
  }

  // Méthode de déconnexion de l'utilisateur
  public logout(){
    this.router.navigateByUrl("/")
    this.connected = false
    this.user = undefined
    localStorage.clear()
  }

  // Getter pour récupérer les informations de l'utilisateur connecté
  get get_user(){
    if(this.user != undefined)
      return this.user;

    return new Utilisateur({})
  }
}
