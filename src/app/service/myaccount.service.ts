import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Blogs } from '../models/blogs';

@Injectable()
export class MyAccountService {
  private blogsData$ = new BehaviorSubject<Blogs[]>(null);
constructor(private http: HttpClient){}

  getBlogs() {
    if(this.blogsData$.value) {
      return this.blogsData$.asObservable();
    }
    return this.http.get(`${environment.base_url}/v1/blogs`)
      .pipe(map((response: Blogs[]) => {
          this.blogsData$.next(response);
          return response;
      }))
  }
  //get all users
  getAllUsers() {
    return this.http.get(`${environment.base_url}/v1/getUser`)
  }
  deleteUserById(id){
    return this.http.delete(`${environment.base_url}/v1/deleteUser/${id}`)
  }
  //get all orders
  getAllOrders() {
    return this.http.get(`${environment.base_url}/v1/orders`)
  }

  refreshBlogsData(){
    this.blogsData$.next(null);
  }
}
