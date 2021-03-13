import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../login/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;
    // on n'autorisera l'activation de la route associée que si on est
    // bien un admin
    return this.authService.hasToken().then((token) => {
      if (token) {
        console.log('GUARD : vous avez un access token');
        this.authService.getUserByToken().subscribe(reponse => {
          console.log(reponse);
          if (reponse.name){
             const admin = new User();
             this.authService.admin = admin;
          }
        }, error => {
          console.log(error);
          this.authService.logOut();
          this.router.navigate(['/login']);
        });
        return true;
      } else {
        // On renvoie vers la page d'accueil
        console.log('GUARD : vous n\'êtes pas autorisé à naviguer vers EDIT (vous n\'êtes pas admin))');
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
