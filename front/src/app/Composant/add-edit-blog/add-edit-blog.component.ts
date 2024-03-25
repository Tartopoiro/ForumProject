import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../Services/user/user.service";
import {Blog} from "../../Class/Blog/blog";
import {formatDate, NgForOf} from "@angular/common";
import {ApiService} from "../../Services/api/api-service.service";
import {UserFindService} from "../../Services/userFind/user-find.service";

@Component({
  selector: 'app-add-edit-blog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgForOf
  ],
  templateUrl: './add-edit-blog.component.html',
  styleUrl: './add-edit-blog.component.css'
})
export class AddEditBlogComponent{
  // Propriété pour indiquer si le blog est en mode édition
  protected edit = false

  // Définition du formulaire de blog
  form: FormGroup;

  // Instance de Blog utilisée pour l'ajout ou l'édition
  blogTmp: Blog;

  // Contrôle pour la recherche d'utilisateurs
  inputSearch= new FormControl();

  // Liste de recherche pour les utilisateurs
  protected listSearch = new Map()

  // Liste des blogs d'utilisateur
  protected listUserBlog : number[] = []

  // ID temporaire de l'utilisateur à ajouter
  protected idUserAddTmp = 0;


  // Constructeur du composant
  constructor(protected api:ApiService, protected user:UserService,
              fb:FormBuilder, private route: ActivatedRoute,
              private router:Router, protected  userFind:UserFindService) {

    // Valeur null de base
    let idBlog = null;
    let date = new Date();
    this.blogTmp = new Blog({DateCreation: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()});

    // Abonnement aux paramètres d'URL pour détecter l'édition d'un blog
    this.route.params.subscribe(params => {
      idBlog = params['idBlog'];

      // Vérification si un identifiant de blog est présent
      if (idBlog != null) {
        this.edit = true;

        // Récupération du blog depuis l'API
        this.api.getBlog(idBlog, this.user.get_user.id_Utilisateur).subscribe((data: any) => {
          //console.log(data)

          // Vérification si des données ont été retournées
          if (data && data[0] && data[0][0]) {

            let aBlog = data[0][0]

            //console.log(aBlog)

            // Vérification si l'utilisateur actuel est propriétaire du blog
            if(aBlog.Id_Utilisateur !== this.user.get_user.id_Utilisateur){
              this.router.navigateByUrl("/")
            }

            // Attribution des valeurs du blog récupéré à l'instance blogTmp
            this.blogTmp = new Blog({
              Id_Blog: aBlog.Id_Blog,
              Public: aBlog.Public === 1,
              Titre: aBlog.Titre,
              DateCreation: new Date(aBlog.DateCreation),
              Descriptif: aBlog.Descriptif,
              Id_Utilisateur: aBlog.Id_Utilisateur
            });
          }

          // Debug
          //console.log(this.blogTmp)

          // Création du formulaire avec les données du blog
          this.form = fb.group({
            title: this.blogTmp.Titre,
            access: this.blogTmp.Public,
            dateC: formatDate(this.blogTmp.DateCreation, 'yyyy-MM-dd', 'en'),
            description: this.blogTmp.Descriptif
          })

          // Désactivation du champ de date du formulaire
          this.form.controls['dateC'].disable()

          // Chargement de la liste d'utilisateurs
          this.reloadList()
        });
      }
    });

    // Création du formulaire par défaut avec les valeurs du blog temporaire
    this.form = fb.group({
      title: this.blogTmp.Titre,
      access: this.blogTmp.Public,
      dateC: formatDate(this.blogTmp.DateCreation, 'yyyy-MM-dd', 'en'),
      description: this.blogTmp.Descriptif
    })

    // Désactivation du champ de date du formulaire
    this.form.controls['dateC'].disable()
    //this.userTmp = user.get_user;

    // Abonnement aux changements de la valeur de recherche
    this.inputSearch.valueChanges.subscribe((value) => {

      // Recherche d'utilisateurs en fonction de la valeur saisie
      this.listSearch = this.userFind.search(value, this.listUserBlog, this.user.get_user.id_Utilisateur);
      this.idUserAddTmp = 0;
    })

  }


  // Méthode pour soumettre le formulaire de blog
  bSend() {
    if(this.edit){
      // Mise à jour du blog existant
      this.blogTmp.Public = this.form.get("access")?.value
      this.blogTmp.Titre = this.form.get("title")?.value
      this.blogTmp.Descriptif = this.form.get("description")?.value
      this.blogTmp.Id_Utilisateur = this.user.get_user.id_Utilisateur;

      //console.log(this.blogTmp)

      // Appel de l'API pour mettre à jour le blog
      this.api.updateBlog(this.blogTmp).subscribe()

      // Redirection vers la page du blog
      this.router.navigateByUrl('/blog/'+this.blogTmp.Id_Blog)
    }else {
      // Création d'un nouveau blog
      this.blogTmp.Public = this.form.get("access")?.value
      this.blogTmp.Titre = this.form.get("title")?.value
      this.blogTmp.Descriptif = this.form.get("description")?.value
      this.blogTmp.Id_Utilisateur = this.user.get_user.id_Utilisateur;

      //console.log(this.blogTmp)

      // Appel de l'API pour créer le blog
      this.api.createBlog(this.blogTmp).subscribe()

      // Redirection vers le profil de l'utilisateur
      this.router.navigateByUrl('/profile')
    }
  }

  // Méthode pour supprimer un blog
  supBlog() {
    this.api.deleteBlog(this.blogTmp.Id_Blog+'').subscribe((data:any) => {
      this.router.navigateByUrl('/profile')
    })
  }

  // Méthode pour définir l'utilisateur à ajouter
  setUserAdd(id: number, str:String) {
    this.inputSearch.setValue(str+" ");
    this.idUserAddTmp = id
  }

  // Méthode pour obtenir les clés d'une map
  getKeys(map: Map<number, String>){
    return Array.from(map.entries());
  }

  // Méthode pour ajouter un utilisateur au blog
  AddUser() {
    //console.log(this.idUserAddTmp)
    if(this.idUserAddTmp != 0){
      this.api.createAccessBlog(this.blogTmp.Id_Blog+"",this.idUserAddTmp)?.subscribe((data:any) => {
        this.inputSearch.setValue("")
        this.reloadList()
      })
    }
  }

  // Méthode pour recharger la liste des utilisateurs ayant accès au blog
  protected reloadList(){
    this.api.getAccessBlog(this.blogTmp.Id_Blog).subscribe((data:any) => {

      if(data && data[0]){

        this.listUserBlog = []

        data[0].forEach((entry: { Id_Utilisateur: any; }) => {
          if(entry.Id_Utilisateur !== this.user.get_user.id_Utilisateur)
            this.listUserBlog.push(entry.Id_Utilisateur);
        });

        // Debug
        //console.log(this.listUserBlog)
      }
    })
  }

  // Méthode pour obtenir une liste d'utilisateurs
  getListUser(userlist:number[]){
    return Array.from(userlist.entries());
  }

  // Méthode pour supprimer un utilisateur ayant accès au blog
  removeUser(idUser:number){
    this.api.deleteAccessBlog(this.blogTmp.Id_Blog+"", idUser).subscribe((data:any) => {
      this.reloadList()
    })
  }
}
