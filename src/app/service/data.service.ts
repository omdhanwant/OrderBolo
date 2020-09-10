import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService{
  loading = false;
  constructor(private http: HttpClient){}

  getData(url) {
    return this.http.get(url);
  }

  postData(url, body,options?) {
    return this.http.post(url, body, options)
  }
  // getUserInformation(){
  //     return this.http.get(environment.base_url);
  // }
}
