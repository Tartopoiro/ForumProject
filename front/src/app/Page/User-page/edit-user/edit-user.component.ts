import { Component } from '@angular/core';
//import {ApiService} from "../../../Services/api/api-service.service";
import {RouterLink} from "@angular/router";
import {UserService} from "../../../Services/user/user.service";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  constructor(protected user:UserService) {
  }

}
