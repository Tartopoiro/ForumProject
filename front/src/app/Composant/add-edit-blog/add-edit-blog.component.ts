import {Component, Input, input} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../Services/user/user.service";
import {Utilisateur} from "../../Class/Utilisateur/utilisateur";
import {Blog} from "../../Class/Blog/blog";
import {formatDate} from "@angular/common";
import {ApiService} from "../../Services/api/api-service.service";

@Component({
  selector: 'app-add-edit-blog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-edit-blog.component.html',
  styleUrl: './add-edit-blog.component.css'
})
export class AddEditBlogComponent {
  protected edit = false

  form: FormGroup;

  blogTmp: Blog

    constructor(protected api:ApiService, protected user:UserService,
                fb:FormBuilder, private route: ActivatedRoute,
                private router:Router) {

      // Valeur null de base
      let idBlog = null;
      let date = new Date();
      this.blogTmp = new Blog({DateCreation: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()});

      this.route.params.subscribe(params => {
        idBlog = params['idBlog'];

        if (idBlog != null) {
          this.edit = true;
          this.api.getBlogById(idBlog).subscribe((data: any) => {
            console.log(data)

            if (data && data[0] && data[0][0]) {

              let aBlog = data[0][0]

              console.log(aBlog)

              if(aBlog.Id_Utilisateur !== this.user.get_user.id_Utilisateur){
                this.router.navigateByUrl("/")
              }

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

            this.form = fb.group({
              title: this.blogTmp.Titre,
              access: this.blogTmp.Public,
              dateC: formatDate(this.blogTmp.DateCreation, 'yyyy-MM-dd', 'en'),
              description: this.blogTmp.Descriptif
            })

            this.form.controls['dateC'].disable()
          });
        }
      });

      this.form = fb.group({
        title: this.blogTmp.Titre,
        access: this.blogTmp.Public,
        dateC: formatDate(this.blogTmp.DateCreation, 'yyyy-MM-dd', 'en'),
        description: this.blogTmp.Descriptif
      })

      this.form.controls['dateC'].disable()
      //this.userTmp = user.get_user;

    }




  bSend() {

    if(this.edit){
      this.blogTmp.Public = this.form.get("access")?.value
      this.blogTmp.Titre = this.form.get("title")?.value
      this.blogTmp.Descriptif = this.form.get("description")?.value

      this.blogTmp.Id_Utilisateur = this.user.get_user.id_Utilisateur;

      //console.log(this.blogTmp)

      this.api.updateBlog(this.blogTmp).subscribe()

      this.router.navigateByUrl('/blog/'+this.blogTmp.Id_Blog)

    }else {
      this.blogTmp.Public = this.form.get("access")?.value
      this.blogTmp.Titre = this.form.get("title")?.value
      this.blogTmp.Descriptif = this.form.get("description")?.value

      this.blogTmp.Id_Utilisateur = this.user.get_user.id_Utilisateur;

      //console.log(this.blogTmp)

      this.api.createBlog(this.blogTmp).subscribe()

      this.router.navigateByUrl('/profile')
    }
  }
}
