import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {UserService} from "./Services/user/user.service";
import {ApiService} from "./Services/api/api-service.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),ApiService, UserService]
};
