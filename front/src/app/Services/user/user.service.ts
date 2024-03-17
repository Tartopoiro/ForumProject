import { Injectable } from '@angular/core';
import {ApiService} from "../api/api-service.service";
import {Utilisateur} from "../../Class/Utilisateur/utilisateur";
import {CanActivateFn, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private connected: boolean = false;

  private user: Utilisateur | undefined;

  constructor(private api:ApiService, private router:Router) {
    // Obtenir la date actuelle
    const currentDate = new Date();

    //Recup info localStorage
    let dateStr = localStorage.getItem("dateCo") || undefined
    let email = localStorage.getItem("email") || undefined


    if(email != undefined && dateStr != undefined){
      // Timeout en minute entre heure actuelle <-> heure de dernière connexion
      const differenceInMinutes = Math.abs((currentDate.getTime() - parseInt(dateStr)) / (1000 * 60));

      if(differenceInMinutes < 30 ) this.connexion(email,false)
      else console.log("Timeout connexion ( > 30 min)")
      // else -> Pas de connexion
    }
  }

  public async connexion(mail: string, redirect: boolean) {
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
      })
    }

    return this.connected;
  }

  public async inscription(utilisateur: Utilisateur) {
    if (await this.api.apiWork()) {
      this.api.createUser(utilisateur).subscribe( {
        next: (data: any) => {
          // Debug
          //console.log(data)

          this.user = utilisateur;
          this.connected = true

          this.router.navigateByUrl("/")

          localStorage.setItem("email", this.user.email);
          localStorage.setItem("dateCo", String(Date.now()))
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur HTTP :', error.status);
          this.connected = false;
        }
      })
    }

    return this.connected;
  }

  public async mettreAJourProfil(utilisateur: Utilisateur){
    if (await this.api.apiWork()) {
      this.api.updateUser(utilisateur).subscribe((data: any) => {
        console.log(data);
        /*if(data && data[0] && data[0][0]){
          this.user = new Utilisateur(data[0][0]);
          this.connected = true

          this.router.navigateByUrl("/")
          console.log("Connecté !")

          localStorage.setItem("email", mail);
          localStorage.setItem("dateCo", String(Date.now()))

          //Debug
          //console.log(this)
        }else{
          console.log("user introuvable !")
          this.connected = false
        }*/
      })
    }
  }

  public isConnected(){
    return this.connected;
  }

  public logout(){
    this.router.navigateByUrl("/")
    this.connected = false
    this.user = undefined
    localStorage.clear()
  }

  get get_user(){
    if(this.user != undefined)
      return this.user;

    return new Utilisateur({})
  }

}
