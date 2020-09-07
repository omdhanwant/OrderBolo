import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService extends DataService{
  authenticated: boolean = false;

  isAuthenticated(){
    return this.authenticated;
  }

  generateOtp(mobileNumber: {mobile: string}){
   return this.postData(`${environment.base_url}/v1/mobileLogin`,mobileNumber);
  }

  verifyOtp(data: {mobile: string, otp: string;}){
    return this.postData(`${environment.base_url}/v1/verifyOtp`,data);
   }
}
