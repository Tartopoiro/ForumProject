import { Routes } from '@angular/router';
import {HomeComponent} from "./Page/home/home.component";
import {ErrorComponent} from "./Page/404/404.component";
import {BlogComponent} from "./Page/blog/blog.component";

export const routes: Routes = [

  //Home
  {path: '',
    component:HomeComponent},

  //Blog
  {path: 'blog', component:BlogComponent},


  //Route pour les erreurs 404
  {path: '**', pathMatch: 'full',
    component:ErrorComponent},

];
