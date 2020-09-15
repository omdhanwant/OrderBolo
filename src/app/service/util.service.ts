import { Injectable } from '@angular/core';


@Injectable()
export class UtilService {
  private loading: boolean = false;
  private displayAlert: boolean = false;
  private message: string = ''
  constructor(){}

  get isLoading(){
    return this.loading;
  }

  set isLoading(bool){
    this.loading = bool;
  }

  set displayDialog(bool) {
    this.displayAlert = bool;
  }
  get displayDialog() {
    return this.displayAlert;
  }

  set alertMessage(message) {
     this.message = message;
  }

  get alertMessage() {
    return this.message;
  }

  // to read the data form the cookies
  getCookieData(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }
}
