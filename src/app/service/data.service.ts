import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blogs } from '../models/blogs';
import { Users } from '../models/users';


@Injectable()
export class DataService {
  loading = false;
  private userData$ = new BehaviorSubject<Object[]>(null);
  private blogsData$ = new BehaviorSubject<Blogs[]>(null);
  private usersData$ = new BehaviorSubject<Users[]>(null);
  constructor(private http: HttpClient) { }

  getData(url) {
    return this.http.get(url);
  }

  postData(url, body, options?) {
    return this.http.post(url, body, options)
  }

  getUserById(id) {
    if (this.userData$.value) {
      return this.userData$.asObservable();
    }
    return this.http.get(`${environment.base_url}/v1/getUser/${id}`)
      .pipe(map(userData => {
        this.userData$.next(userData as Object[])
        return userData
      }))
  }
  getBlogs() {
    //  if(this.blogsData$.value) {
    //      return this.blogsData$.asObservable();
    //  }
    return this.http.get(`${environment.base_url}/v1/blogs`)
      .pipe(map(blogsData => {
        this.blogsData$.next(blogsData as Blogs[])
        return blogsData
      }))
  }
  //get all users
  getAllUsers() {
    //  if(this.usersData$.value) {
    //      return this.usersData$.asObservable();
    //  }
    return this.http.get(`${environment.base_url}/v1/getUser`)
      .pipe(map(usersData => {
        this.usersData$.next(usersData as Users[])
        return usersData
      }))
  }
  deleteUserById(id){
    return this.http.delete(`${environment.base_url}/v1/deleteUser/${id}`)
  }

  refreshUserData() {
    this.userData$.next(null);
  }
}

