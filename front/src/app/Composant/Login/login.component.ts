import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../Services/user/user.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Propriété pour stocker l'email de l'utilisateur
  email:string = ''

  // Propriété pour stocker l'ID de l'intervalle utilisé pour vérifier périodiquement la connexion
  // @ts-ignore
  interval: NodeJS.Timeout | undefined

  // Propriété pour indiquer s'il y a une erreur de connexion
  error:boolean = false;

  // Constructeur du composant, injecte les dépendances nécessaires
  constructor(private user: UserService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {
    // Démarre la vérification périodique de la connexion lorsque le composant est créé
    this.startPeriodicCheck();
  }


  // Méthode pour tenter de se connecter
  async bConnexion() {
    //console.log("test")

    // Appelle la méthode de connexion du service utilisateur
    await this.user.connexion(this.email, false);

    // Attend un court délai pour laisser le temps à la connexion de s'établir
    await new Promise(r => setTimeout(r, 100));

    // Vérifie si l'utilisateur est connecté après la tentative de connexion
    if(!this.user.isConnected()){
      // S'il n'est pas connecté, active le drapeau d'erreur
      this.error = true
    }
  }

  // Méthode pour vérifier l'état de connexion et effectuer des actions en conséquence
  private verificationConnexion(){
    let fin = false;

    // Souscrit aux modifications des paramètres de l'URL
    this.activatedRoute.queryParams.subscribe(params => {
      // Récupère la valeur du paramètre 'page' de l'URL
      let page = params['page'];

      // Vérifie si l'utilisateur est connecté et s'il y a une page spécifiée dans les paramètres
      if (this.user.isConnected() && page != undefined){
        console.log("Redirect ...")

        // Debug
        //console.log(params)

        // Redirige l'utilisateur vers la page spécifiée
        this.router.navigateByUrl("/"+page);
        fin = true;
      }else if (this.user.isConnected()){
        // Si l'utilisateur est connecté mais aucune page n'est spécifiée, redirige-le vers la page principale
        this.router.navigateByUrl("/");
        fin = true;
      }
    });

    // Retourne vrai si une action de redirection a été effectuée, sinon retourne faux
    return fin;
  }

  // Méthode pour démarrer la vérification périodique de l'état de connexion
  startPeriodicCheck() {
    let count = 0

    // Initialise un intervalle pour vérifier périodiquement l'état de connexion de l'utilisateur
    this.interval = setInterval(() => {
      // Vérifie l'état de connexion et arrête l'intervalle si une action de redirection est effectuée ou si le compteur atteint 300
      if(this.verificationConnexion() || count >= 300)
        clearInterval(this.interval)

      count++;
    }, 100); // Vérifie toutes les 0.1 secondes (en millisecondes)
  }

  // Méthode pour réinitialiser le drapeau d'erreur
  resetError() {
    this.error = false
  }
}
