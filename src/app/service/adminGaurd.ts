import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import * as constants from '../service/constants';


@Injectable()
export class AdminGaurd implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    return this.auth.peekAuthentication()
      .pipe(map(isAuth => {
          if (isAuth && isAuth.user.userType == constants.SUPER_ADMIN) {
            return true;
          }

          this.router.navigateByUrl('/document-doctor');
          return false;

      }));
  }
}
