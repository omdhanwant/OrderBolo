import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
export interface RazorPaymentResponse {
  "razorpay_payment_id": string;
  "razorpay_order_id": string;
  "razorpay_signature": string;
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
  const options = {
    key: id,
    amount: 5000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  return this.http.post('https://api.razorpay.com/v1/orders' , options)
 }
}
