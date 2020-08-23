import { Injectable } from '@angular/core';
// import * as crypto from "../../../node_modules/crypto-js";
// import {APP_ID , appVersion} from '../../assets/config.json';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';
// const config = require('../../assets/config.json');
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  timestamp :number


  constructor(private service: UtilService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.timestamp = new Date().getTime();

    console.log("in AuthInterceptor");
    this.service.isLoading = true;

    const authReq = req.clone({

      setHeaders: {
        // 'Authorization' : 'Bearer',
        'Content-Type': 'application/json'
      }
    });
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.service.isLoading = false;
          console.log(event.statusText);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
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
