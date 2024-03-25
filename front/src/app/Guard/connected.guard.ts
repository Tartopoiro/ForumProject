import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router, RouterStateSnapshot
} from '@angular/router';
import {UserService} from "../Services/user/user.service";
import {inject} from "@angular/core";

// Définition d'un garde pour les utilisateurs connectés
export const ConnectedGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

  // Injection du service UserService pour vérifier l'état de connexion de l'utilisateur
  let user = inject(UserService)
  // Injection du service Router pour la navigation
  let router = inject(Router)

  // Vérifier si l'utilisateur n'est pas connecté
  if(!user.isConnected()) {
    //Debug
    //console.log(user)

    // Rediriger l'utilisateur vers la page de connexion avec l'URL de la page actuelle en tant que paramètre "page"
    router.navigateByUrl("/login?page="+state.url);
    // Indiquer à Angular de ne pas activer la route
    return false;
  }
  // Si l'utilisateur est connecté, permettre l'accès à la route
  return true;
}

// Définition d'un garde pour les utilisateurs non connectés
export const NotConnectedGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

  // Injection du service UserService pour vérifier l'état de connexion de l'utilisateur
  let user = inject(UserService)

  // Vérifier si l'utilisateur n'est pas connecté
  if(!user.isConnected()) {
    //Debug
    //console.log(user)

    // Si l'utilisateur n'est pas connecté, permettre l'accès à la route
    return true
  }

  // Si l'utilisateur est connecté, empêcher l'accès à la route
  return false
}
