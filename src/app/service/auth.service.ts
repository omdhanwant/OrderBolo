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
  private peekAuth = new BehaviorSubject<AuthUser>(null);

   userInfo: User = {
    userType: '',
    mobile: '',
    name: '',
    email: '',
    profile_photo: '',
    id: null
  };

  constructor(private http: HttpClient){
    // check if user already logged in
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
    return sessionStorage.getItem(TOKEN);;
  }

  private setToken(token){
    if(token) {
      sessionStorage.setItem(TOKEN, token);
      this.authenticated = true;
      this.refreshAuth();
    }
  }

  private setUser(user) {
    sessionStorage.setItem(USER, JSON.stringify(user));
  }

  generateOtp(mobileNumber: {mobile: string}){
   return this.http.post(`${environment.base_url}/v1/mobileLogin`,mobileNumber);
  }

  verifyOtp(data: {mobile: string, otp: string;}){
    return this.http.post(`${environment.base_url}/verifyOtp`,data)
    .pipe(
      map((response) => {
        let res = response[0] as VerifyOtpData
        // console.log(res)
        this.userInfo = {
          userType: res.user_type,
          mobile: res.mobile,
          name: res.name,
          email: res.email,
          profile_photo: '',
          id: res.user_id
        }
        this.setUser(this.userInfo);
        this.setToken(res.token)
        return this.userInfo
      })
    );
   }

   logOut(){
     sessionStorage.removeItem(TOKEN);
     sessionStorage.removeItem(USER);
     this.authenticated = false;
     this.userInfo = null
     this.refreshAuth();
   }
}
