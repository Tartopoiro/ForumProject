import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router, RouterStateSnapshot
} from '@angular/router';
import {UserService} from "../Services/user/user.service";
import {inject} from "@angular/core";

export const ConnectedGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

  let user = inject(UserService)
  let router = inject(Router)

  if(!user.isConnected()) {
    console.log(user)
    router.navigateByUrl("/login?page="+state.url)
    return false
  }

  return true;
}

export const NotConnectedGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

  let user = inject(UserService)

  if(!user.isConnected()) {
    console.log(user)
    return true
  }

  return false
}
