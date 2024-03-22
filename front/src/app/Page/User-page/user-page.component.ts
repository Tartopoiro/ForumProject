import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../Services/api/api-service.service";
import {UserService} from "../../Services/user/user.service";
import {list} from "postcss";
import {data} from "autoprefixer";

@Component({
  selector: 'app-User-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  protected profileM:boolean = true;

  protected listeBlogs:any[];

  constructor(protected api:ApiService,
              protected user:UserService) {

    this.listeBlogs = [];

    this.api.getUserBlog(user.get_user.id_Utilisateur+"").subscribe((data:any) => {
      //console.log(data)

      if(data && data[0] && data[0][0]){
        this.listeBlogs = data[0];
      }
    })

    //, route: ActivatedRoute
    /*const name = route.snapshot.paramMap.get('name');

    console.log(name)

    if(name != null){
      this.profileM = false;
    }*/
  }
}
