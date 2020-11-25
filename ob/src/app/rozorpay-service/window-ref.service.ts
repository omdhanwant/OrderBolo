import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface RazorPaymentResponse {
  "razorpay_payment_id": string;
  "razorpay_order_id": string;
  "razorpay_signature": string;
}

export interface RazorPayOrder {
  "id": string;
  "entity": string;
  "amount": number;
  "amount_paid": number;
  "amount_due": number;
  "currency": string;
  "receipt": string;
  "offer_id": null,
  "status": string;
  "attempts": number;
  "notes": Object,
  "created_at": 1600582482
}
function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor(@Inject(PLATFORM_ID) private platformId: object, private http: HttpClient) { }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

 // create order using razor payment
 createRazorPaymentOrder(id,amount) {
   const header = new HttpHeaders({
     'Authorization' : 'Basic cnpwX3Rlc3RfcDBIeE9GcWdFc212aFI6am1BZHJFakJTUElqUkhiaWxvSktYZWZ3',
      'Accept' : '*/*'});
  const options = {
    key: id,
    amount: amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  return this.http.post('https://api.razorpay.com/v1/orders' , options, {headers: header})
 }
}
