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
  email:string = ''

  // @ts-ignore
  interval: NodeJS.Timeout | undefined

  error:boolean = false;


  constructor(private user: UserService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {
    this.startPeriodicCheck();
  }

  async bConnexion() {
    //console.log("test")

    let connected:boolean = await this.user.connexion(this.email, false);

    if(!connected){
      this.error = true
    }
  }

  private verificationConnexion(){
    let fin = false;

    this.activatedRoute.queryParams.subscribe(params => {
      let page = params['page'];
      if (this.user.isConnected() && page != undefined){
        console.log("Redirect ...")

        console.log(params)

        fin = true;
        this.router.navigateByUrl("/"+page);

      }else if (this.user.isConnected()){
        this.router.navigateByUrl("/");
        fin = true;
      }
    });

    if(fin) return true;
    return false;
  }

  startPeriodicCheck() {

    let count = 0

    this.interval = setInterval(() => {
      // Vérifie l'état de connexion à intervalles réguliers
      if(this.verificationConnexion() || count >= 300)
        clearInterval(this.interval)

      count++;
    }, 100); // Vérifie toutes les 0.1 secondes (en millisecondes)
  }

  protected readonly console = console;
}
