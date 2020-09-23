import { Injectable } from '@angular/core';
// import * as crypto from "../../../node_modules/crypto-js";
// import {APP_ID , appVersion} from '../../assets/config.json';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { AlertService } from './alertService';
// const config = require('../../assets/config.json');
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  timestamp :number


  constructor(private service: UtilService, private auth: AuthService, private alertService: AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.timestamp = new Date().getTime();

    console.log("in AuthInterceptor");
    this.service.loading = true;

    const authReq = req.clone({

      setHeaders: {
        'Authorization' : this.auth.isAuthenticated() ? `Bearer ${this.auth.getToken()}` : ''
        // 'Content-Type': 'application/json'
      }
    });
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.service.loading = false;
          // this.service.alertMessage = 'Success!'
          // this.service.displayDialog = true;
          this.alertService.addSingle('success','Message','Success');
          // setTimeout(() => {
          //   this.alertService.clear();
          // }, 2000);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.service.loading = false;
          // this.service.alertMessage = 'Failed!'
          // this.service.displayDialog = true;
          this.alertService.addSingle('error','Message','Unexpected Error Occured');
          // setTimeout(() => {
          //   // this.service.displayDialog = false;
          //   // this.service.alertMessage = ''
          //   this.alertService.clear();
          // }, 2000);
          this.handleError(err);
        }
      })
    )
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
        console.log('Bad Request!')
    }

    if (error.status === 404) {
      console.log('Service Not Found!')
    }

    if (error.status === 401) {
      console.log('Unauthorised Error!')
    }

    if (error.status === 403) {
      console.log('Forbidden!')
    }

    console.log('Unexpected Error Occured!')
}

}
