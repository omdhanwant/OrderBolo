import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';


@Injectable()
export class AdminGaurd implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    return this.auth.peekAuthentication()
      .pipe(map(isAuth => {
          if (isAuth && isAuth.user.userType == 'super-admin') {
            return true;
          }

          this.router.navigateByUrl('/document-doctor');
          return false;

      }));
  }
}
