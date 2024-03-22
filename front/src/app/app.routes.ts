import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import {HomeComponent} from "./Page/Home/home.component";
import {ErrorComponent} from "./Composant/404/404.component";
import {BlogComponent} from "./Page/Blog/blog.component";
import {UserPageComponent} from "./Page/User-page/user-page.component";
import {LoginComponent} from "./Composant/Login/login.component";
import {RegisterComponent} from "./Composant/Register/register.component";
import {EditUserComponent} from "./Page/User-page/edit-user/edit-user.component";
import {ConnectedGuard, NotConnectedGuard} from "./Guard/connected.guard";
import {inject, NgModule} from "@angular/core";
import {UserService} from "./Services/user/user.service";
import {HttpClient} from "@angular/common/http";
import {LogoutPageComponent} from "./Composant/logout-page/logout-page.component";
import {AddEditBlogComponent} from "./Composant/add-edit-blog/add-edit-blog.component";


export const routes: Routes = [

  //Login
  {path: 'login', component:LoginComponent, canActivate: [NotConnectedGuard]},

  //Signup
  {path: 'signup', component:RegisterComponent, canActivate: [NotConnectedGuard]},

  //Profile Page
  {path: 'profile', canActivate:[ConnectedGuard],
    children:[
      {
        path: '',
        component:UserPageComponent
      },
      {
        path: 'edit',
        component:EditUserComponent,
      },
      {
        path: 'newBlog',
        component:AddEditBlogComponent,
      }
    ]
  },

  //Signup
  {path: 'logout', component:LogoutPageComponent, canActivate: [ConnectedGuard]},

  //Home
  {path: '', component:HomeComponent},

  //Blog
  {path: 'blog',
    children:[
      {
        path: '',
        component:BlogComponent
      },
      {
        path: ':idBlog',
        children:[
          {
            path:'',
            component: BlogComponent
          },
          {
            path:"edit",
            component:AddEditBlogComponent,
            canActivate:[ConnectedGuard]
          }
        ]
      }
    ]
  },

  //User Page
  //{path: 'user/:name', component:UserPageComponent},


  //Route pour les erreurs 404
  {path: '**', pathMatch: 'full',
    component:ErrorComponent},

];


