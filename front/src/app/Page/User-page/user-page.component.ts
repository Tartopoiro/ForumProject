import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../Services/api/api-service.service";
import {UserService} from "../../Services/user/user.service";

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

  constructor(protected user:UserService, route: ActivatedRoute) {

    const name = route.snapshot.paramMap.get('name');

    console.log(name)

    if(name != null){
      this.profileM = false;
    }
  }
}
