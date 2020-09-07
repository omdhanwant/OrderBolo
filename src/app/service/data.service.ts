import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService{
  constructor(private http: HttpClient){}

  getData(url) {
    return this.http.get(url);
  }

  postData(url, body) {
    return this.http.post(url, body)
  }
  // getUserInformation(){
  //     return this.http.get(environment.base_url);
  // }
}
