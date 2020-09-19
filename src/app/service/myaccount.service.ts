import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class MyAccountService {
constructor(private http: HttpClient){}

  getBlogs() {
    return this.http.get(`${environment.base_url}/v1/blogs`)
  }
  //get all users
  getAllUsers() {
    return this.http.get(`${environment.base_url}/v1/getUser`)
  }
  deleteUserById(id){
    return this.http.delete(`${environment.base_url}/v1/deleteUser/${id}`)
  }
}
