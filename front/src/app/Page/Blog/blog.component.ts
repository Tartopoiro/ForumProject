import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Blog} from "../../Class/Blog/blog";
import {ApiService} from "../../Services/api/api-service.service";
import {UserService} from "../../Services/user/user.service";
import {UserFindService} from "../../Services/userFind/user-find.service";
import {ErrorComponent} from "../../Composant/404/404.component";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-Blog',
  standalone: true,
  imports: [
    RouterLink,
    ErrorComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './blog.component.html'
})
export class BlogComponent {

  // Déclaration d'une variable blog de type Blog (peut-être une classe ou une interface définie ailleurs)
  protected blog:Blog

  // Nom de l'utilisateur par défau
  protected nomC: String | undefined = 'Admin'

  // Indicateur de chargement
  protected loading: boolean = false;

  // Déclaration des contrôles de formulaire pour le contenu et le titre
  protected contenu = new FormControl();
  protected titre = new FormControl();

  // Tableau de commentaires avec leurs propriétés
  protected commentaires:{
    Id_Message: number;
    Titre: string;
    Contenu: string;
    DatePublication: string;
    Id_Utilisateur:number
  }[] = []

  constructor(private api:ApiService, protected user:UserService,
              private route: ActivatedRoute, protected userFind:UserFindService) {

    this.blog = new Blog({DateCreation: new Date()})

    let idBlog = null

    this.route.params.subscribe(async params => {
      idBlog = params['idBlog'];

      //Attente de connexion au user en cas de besoin
      while (this.user.isloading()) {
        this.loading = true;
        console.log("Loading ....")
        await new Promise(r => setTimeout(r, 10));
      }

      // Récupération des détails du blog depuis l'API en fonction de son identifiant
      if (idBlog != null) {
        this.api.getBlog(idBlog, this.user.get_user.id_Utilisateur).subscribe((data: any) => {

          //console.log(data)

          // Vérification si des données ont été retournées
          if (data && data[0] && data[0][0]) {

            let aBlog = data[0][0]

            //console.log(aBlog)

            this.blog = new Blog({
              Id_Blog: aBlog.Id_Blog,
              Public: aBlog.Public === 1,
              Titre: aBlog.Titre,
              DateCreation: new Date(aBlog.DateCreation),
              Descriptif: aBlog.Descriptif,
              Id_Utilisateur: aBlog.Id_Utilisateur
            });

            this.nomC = this.blog.Id_Blog != null ? this.userFind.getNomComplet(this.blog.Id_Utilisateur) : 'Admin'
          }

          //Load commentaires
          this.reloadCom()

          // Debug
          //console.log(this.blog)

          this.loading = false
        });
      } else {
        // Si aucun identifiant de blog n'est fourni, initialiser un nouveau blog par défaut
        this.blog = new Blog({
          Id_Blog: 0,
          Titre: 'Premier Blog !',
          DateCreation: new Date('2024-02-14 15:34:18-0200'),
          Descriptif: 'Petite description de mon blog'
        })
      }
    });
  }

  // Fonction pour obtenir le nom du mois en lettres
  protected moisEnLettres(mois:number) {
    const moisEnLettres = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return moisEnLettres[mois];
  }

  // Fonction pour recharger les commentaires depuis l'API
  private reloadCom(){
    this.api.getMessageByBlog(this.blog.Id_Blog).subscribe((data:any) => {
      // Debug
      //console.log(data)

      if(data && data[0]){
        this.commentaires = data[0];
      }
    })
    }

  // Fonction pour ajouter un commentaire
  protected AddComm() {
    this.api.createMessage(this.blog.Id_Blog,this.user.get_user.id_Utilisateur,this.titre.value,this.contenu.value).subscribe((data:any) => {
      this.reloadCom()
      this.titre.setValue("")
      this.contenu.setValue("")
    })
    //console.log(this.contenu.value)
  }



  // Fonction pour convertir une date en chaîne de caractères
  protected dateToString(date:any){

    if(typeof date == "string"){
      date = new Date(date)
    }else if(date.getDate){
      // Nothing it's ok
    }else{
      return ""
    }

    return date.getDate() + ' ' + this.moisEnLettres(date.getMonth()) + ' ' + date.getFullYear()
  }
}
