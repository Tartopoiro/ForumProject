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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  form: FormGroup;


  protected userTmp:Utilisateur;

  constructor(protected user:UserService, fb:FormBuilder) {

    this.userTmp = new Utilisateur({})

    this.form = fb.group({
      firstname:user.get_user?.nom,
      lastname:user.get_user?.prenom,
      email:user.get_user?.email,
      number:user.get_user?.numero
    })

    this.form.controls['email'].disable()
    //this.userTmp = user.get_user;
  }

  bUpdate() {

    this.userTmp.email = this.user.get_user.email

    this.userTmp.nom = this.form.get("firstname")?.value
    this.userTmp.prenom = this.form.get("lastname")?.value
    this.userTmp.numero = this.form.get("number")?.value

    if(this.userTmp != undefined)
      this.user.mettreAJourProfil(this.userTmp);
  }
}
