import { Component } from '@angular/core';
//import {ApiService} from "../../../Services/api/api-service.service";
import {RouterLink} from "@angular/router";
import {UserService} from "../../../Services/user/user.service";
import {Utilisateur} from "../../../Class/Utilisateur/utilisateur";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent {
  // Déclaration d'une variable form de type FormGroup
  form: FormGroup;

  // Déclaration d'une variable userTmp de type Utilisateur (probablement une classe définie ailleurs dans votre code)
  protected userTmp:Utilisateur;

  constructor(protected user:UserService, fb:FormBuilder) {

    // Initialisation de la variable userTmp avec une nouvelle instance de Utilisateur
    this.userTmp = new Utilisateur({})

    // Création d'un FormGroup avec FormBuilder
    this.form = fb.group({
      firstname:user.get_user?.nom,
      lastname:user.get_user?.prenom,
      email:user.get_user?.email,
      number:user.get_user?.numero
    })

    // Désactivation du champ email dans le formulaire
    this.form.controls['email'].disable()
  }

  // Méthode bUpdate() pour mettre à jour le profil utilisateur
  bUpdate() {

    // Affectation des valeurs du formulaire à userTmp
    this.userTmp.email = this.user.get_user.email
    this.userTmp.nom = this.form.get("firstname")?.value
    this.userTmp.prenom = this.form.get("lastname")?.value
    this.userTmp.numero = this.form.get("number")?.value

    // Vérification si userTmp est défini puis appel de la méthode mettreAJourProfil de UserService avec userTmp en argument
    if(this.userTmp != undefined)
      this.user.mettreAJourProfil(this.userTmp);
  }
}
