import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./Composant/Footer/footer.component";
import {HeaderComponent} from "./Composant/Header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./Services/api/api-service.service";
import {UserService} from "./Services/user/user.service";
import {ConnectedGuard} from "./Guard/connected.guard";

@Component({
  selector: 'app-root',
  standalone: true,
  providers : [],
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent { }
