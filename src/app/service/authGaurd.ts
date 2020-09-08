import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    // if (this.auth.isAuthenticated()) {
    //   // this.router.navigate(['/document-doctor']);
    //   return true;
    // }
    return this.auth.peekAuthentication()
      .pipe(map(isAuth => {
          if (isAuth && isAuth.isAuthenticated) {
            return true;
          }

          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;

      }));
  }
}
