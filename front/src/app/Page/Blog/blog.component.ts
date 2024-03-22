import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Blog} from "../../Class/Blog/blog";
import {ApiService} from "../../Services/api/api-service.service";
import {Utilisateur} from "../../Class/Utilisateur/utilisateur";
import {UserService} from "../../Services/user/user.service";

@Component({
  selector: 'app-Blog',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

  protected blog:Blog

  constructor(private api:ApiService, protected user:UserService,
              private route: ActivatedRoute) {

    this.blog = new Blog({DateCreation: new Date()})

    let idBlog = null

    this.route.params.subscribe(params => {
      idBlog = params['idBlog'];

      if(idBlog != null) {
        this.api.getBlogById(idBlog).subscribe((data: any) => {
          console.log(data)

          if (data && data[0] && data[0][0]) {

            let aBlog = data[0][0]

            console.log(aBlog)

            this.blog = new Blog({
              Id_Blog: aBlog.Id_Blog,
              Public: aBlog.Public === 1,
              Titre: aBlog.Titre,
              DateCreation: new Date(aBlog.DateCreation),
              Descriptif: aBlog.Descriptif,
              Id_Utilisateur: aBlog.Id_Utilisateur
            });
          }

          // Debug
          console.log(this.blog)
        });
      }else {
        this.blog = new Blog({
          Titre:'Premier Blog !',
          DateCreation: new Date('2024-02-14 15:34:18-0200'),
          Descriptif: 'Petite description de mon blog'
        })
      }

    });
  }


   protected moisEnLettres(mois:number) {
    const moisEnLettres = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return moisEnLettres[mois];
  }
}
