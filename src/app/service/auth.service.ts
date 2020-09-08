import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { VerifyOtpData, User } from '../models/authData';
import { HttpClient } from '@angular/common/http';
const TOKEN = 'TOKEN';
const USER = 'USER';

@Injectable()
export class AuthService{
  private authenticated: boolean = false;
  private token: string = null;
  userInfo: User = {
    mobile: '',
    name: '',
    id: null
  };

  constructor(private http: HttpClient){
    this.token = sessionStorage.getItem(TOKEN);
    this.userInfo = JSON.parse(sessionStorage.getItem(USER)) as User;
    if(this.getToken()) {
      this.authenticated = true;
    }
  }

  isAuthenticated(){
    return this.authenticated;
  }

  getToken(){
    return this.token;
  }

  setToken(token){
    if(token) {
      sessionStorage.setItem(TOKEN, token);
      this.authenticated = true;
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
        this.setToken(res.token)
        this.userInfo = {
          mobile: res.mobile,
          name: res.name,
          id: res.user_id
        }
        sessionStorage.setItem(USER, JSON.stringify(this.userInfo));
        return this.userInfo
      })
    );
   }

   logOut(){
     sessionStorage.removeItem(TOKEN);
     sessionStorage.removeItem(USER);
     this.authenticated = false;
     this.userInfo = null
   }
}
