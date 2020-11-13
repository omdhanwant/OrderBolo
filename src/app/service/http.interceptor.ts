import { Injectable } from '@angular/core';
// import * as crypto from "../../../node_modules/crypto-js";
// import {APP_ID , appVersion} from '../../assets/config.json';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { AlertService } from './alertService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  timestamp :number


  constructor(private service: UtilService, private auth: AuthService, private alertService: AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.timestamp = new Date().getTime();
    this.service.showLoader();

    const authReq = req.clone({

      setHeaders: {
        'Authorization' : this.auth.isAuthenticated() ? `Bearer ${this.auth.getToken()}` : ''
        // 'Content-Type': 'application/json'
      }
    });
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.service.hideLoader();
          // this.alertService.addSingle('success','Message','Success');
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.service.hideLoader();
          this.handleError(err);
        }
      })
    )
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.alertService.addSingle('error','Message','Bad Request!');
        console.log('Bad Request!')
    }

    else if (error.status === 404) {
      this.alertService.addSingle('error','Message','Service Not Found!');
      console.log('Service Not Found!')
    }

    else if (error.status === 401) {
      this.alertService.addSingle('error','Message','Unauthorised Error!');
      console.log('Unauthorised Error!')
    }

    else if (error.status === 403) {
      this.alertService.addSingle('error','Message','Forbidden!');
      console.log('Forbidden!')
    }

    else {
      this.alertService.addSingle('error','Message','Unexpected Error Occured!');
      console.log('Unexpected Error Occured!')
    }

}

}
