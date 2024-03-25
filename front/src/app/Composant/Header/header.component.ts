import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../Services/user/user.service";
import {FindBlogService} from "../../Services/findBlog/find-blog.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-Header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected menuOpen:boolean = false;

  // Déclaration d'un contrôle de formulaire pour la saisie de recherche
  inputSearch= new FormControl();

  // Déclaration d'une Map pour stocker les résultats de recherche
  protected listSearch = new Map()

  constructor(protected user: UserService,
              protected findBlog: FindBlogService,
              protected router:Router) {

    // Abonnement aux changements de la valeur de inputSearch
    this.inputSearch.valueChanges.subscribe((value) => {

      // Appel de la fonction search du service FindBlogService et mise à jour de listSearch avec les résultats
      this.listSearch = this.findBlog.search(value);
    })
  }

  // Fonction pour obtenir les clés d'une Map
  getKeys(map: Map<number, String>){
    return Array.from(map.entries());
  }

  // Fonction pour naviguer vers un blog spécifique
  goTo(idBlog: number) {
    // Fermeture du menu
    this.menuOpen = false;

    // Réinitialisation de la valeur de inputSearch
    this.inputSearch.setValue("")
    // Navigation vers la route correspondant au blog avec l'identifiant idBlog
    this.router.navigateByUrl(`blog/${idBlog}`);
  }
}
