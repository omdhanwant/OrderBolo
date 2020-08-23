import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
  authenticated: boolean = false;
  constructor(){}

  isAuthenticated(){
    return this.authenticated;
  }
}
