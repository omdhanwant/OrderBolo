import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckOutData } from '../models/documents';


@Injectable()
export class DataService {
  loading = false;
  private userData$ = new BehaviorSubject<Object[]>(null);
  private checkOutData: CheckOutData;
  constructor(private http: HttpClient) { }

  getData(url) {
    return this.http.get(url);
  }

  postData(url, body, options?) {
    return this.http.post(url, body, options)
  }



  // check out data
  set check_out_data(data: CheckOutData) {
    this.checkOutData = data;
  }

  get check_out_data(): CheckOutData{
    return this.checkOutData;
  }


  // user data
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

  refreshUserData() {
    this.userData$.next(null);
  }


  //check out flow

  checkoutOrder(data) {
    return this.postData(`${environment.base_url}/v1/razorpay`, data);
  }

  orderUpdateWithPayment(data) {
    return this.http.post(`${environment.base_url}/v1/payment`, data);
  }
}

