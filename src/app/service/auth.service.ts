import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { VerifyOtpData, User, AuthUser } from '../models/authData';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
const TOKEN = 'TOKEN';
const USER = 'USER';

@Injectable()
export class AuthService{
  private authenticated: boolean = false;
  private token: string = null;
  private peekAuth = new BehaviorSubject<AuthUser>(null);

  userInfo: User = {
    mobile: '',
    name: '',
    id: null
  };

  constructor(private http: HttpClient){
    // check if user already logged in
    this.token = sessionStorage.getItem(TOKEN);
    this.userInfo = JSON.parse(sessionStorage.getItem(USER)) as User;
    if(this.getToken()) {
      this.authenticated = true;
      this.refreshAuth();
    }
  }

  isAuthenticated(){
    return this.authenticated;
  }

  peekAuthentication() {
    return this.peekAuth.asObservable();
  }

  refreshAuth() {
    this.peekAuth.next({
      user: this.userInfo,
      isAuthenticated: this.authenticated
    })
  }

  getToken(){
    return this.token;
  }

  setToken(token){
    if(token) {
      sessionStorage.setItem(TOKEN, token);
      this.authenticated = true;
      this.refreshAuth();
    }
  }

  generateOtp(mobileNumber: {mobile: string}){
   return this.http.post(`${environment.base_url}/v1/mobileLogin`,mobileNumber);
  }

  verifyOtp(data: {mobile: string, otp: string;}){
    return this.http.post(`${environment.base_url}/verifyOtp`,data)
    .pipe(
      map((response) => {
        let res = response[0] as VerifyOtpData
        this.userInfo = {
          mobile: res.mobile,
          name: res.name,
          id: res.user_id
        }
        sessionStorage.setItem(USER, JSON.stringify(this.userInfo));
        this.setToken(res.token)
        return this.userInfo
      })
    );
   }

   logOut(){
     sessionStorage.removeItem(TOKEN);
     sessionStorage.removeItem(USER);
     this.authenticated = false;
     this.refreshAuth();
     this.userInfo = null
   }
}
