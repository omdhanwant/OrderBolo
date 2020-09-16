import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DataService{
  loading = false;
  private userData$ = new BehaviorSubject<Object[]>(null);
  constructor(private http: HttpClient){}

  getData(url) {
    return this.http.get(url);
  }

  postData(url, body,options?) {
    return this.http.post(url, body, options)
  }

  getUserById(id){
    if(this.userData$.value) {
        return this.userData$.asObservable();
    }
    return this.http.get(`${environment.base_url}/v1/getUser/${id}`)
      .pipe(map( userData => {
        this.userData$.next(userData as Object[])
        return userData
      }))
   }

   refreshUserData(){
     this.userData$.next(null);
   }
}

