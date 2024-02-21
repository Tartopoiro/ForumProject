import { Routes } from '@angular/router';
import {HomeComponent} from "./Page/Home/home.component";
import {ErrorComponent} from "./Composant/404/404.component";
import {BlogComponent} from "./Page/Blog/blog.component";
import {UserPageComponent} from "./Page/User-page/user-page.component";
import {LoginComponent} from "./Composant/Login/login.component";
import {RegisterComponent} from "./Composant/Register/register.component";
import {EditUserComponent} from "./Page/User-page/edit-user/edit-user.component";

export const routes: Routes = [

  //Home
  {path: 'login', component:LoginComponent},

  //Home
  {path: 'signup', component:RegisterComponent},

  //Home
  {path: '', component:HomeComponent},

  //Blog
  {path: 'blog', component:BlogComponent},

  //User Page
  {path: 'user', component:UserPageComponent},

  //User Page
  {path: 'user/edit', component:EditUserComponent},


  //Route pour les erreurs 404
  {path: '**', pathMatch: 'full',
    component:ErrorComponent},

];
