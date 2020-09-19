import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { CheckOutData } from '../models/documents';
import { Users } from '../models/users';
import { RazorPaymentResponse, WindowRefService } from '../rozorpay-service/window-ref.service';
import { DataService } from '../service/data.service';
import * as crypto from "crypto-js";

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss'],
  providers: [WindowRefService]
})
export class OrderCheckoutComponent implements OnInit {
  details: CheckOutData
  private amount = 5000; // paisa = 50 rs
  private __key ='rzp_test_p0HxOFqgEsmvhR';
  constructor(private winRef: WindowRefService, private dataService: DataService, private route: Router) {
    if(!this.dataService.check_out_data) {
      this.route.navigateByUrl('/document-doctor')
  }
  }

  ngOnInit(): void {

    this.details = this.dataService.check_out_data;
    this.dataService.getUserById(this.details.user_id).
    pipe(switchMap((userData: any) => {
      const user = userData[0]['data'] as Users;
      this.details.name = user.name;
      this.details.address = user.address;
      this.details.mobile = user.mobile;
      this.details.pincode = user.pin_code;

      console.log(this.details)

      const orderPayload ={
        user_id: this.details.user_id,
        document_id: this.details.order_id,
        name: this.details.name,
        address: this.details.address,
        city: 'null',//? this.details.city : '',
        state: 'null' ,//? this.details.state : '',
        pin_code: this.details.pincode,
        mobile: this.details.mobile,
        amount: this.amount,
        status: 'PENDING'
    }
    console.log(orderPayload)
      return this.dataService.checkoutOrder(orderPayload)
    }), take(1)).subscribe( response => console.log(response));
  }

  createRzpayOrder(){
    // required for razor order creation with same order id generated in server
    this.winRef.createRazorPaymentOrder(this.__key,this.amount)
      .pipe(take(1)).subscribe(paymentOrder => {
        console.log(paymentOrder)
        this.payWithRazor();
      })

      // this.payWithRazor();
  }


  payWithRazor() {
    const options: any = {
      key: this.__key,
      amount: this.amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'vit solutions', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: this.details.order_id, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0B0633'
      }
    };
    options.handler = ((response: RazorPaymentResponse, error) => {
      console.log(response);
      // call your backend api to verify payment signature & capture transaction
      this.updateOrderStatus(response);
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

  verifySignature(paymentResponse: RazorPaymentResponse){
  //Use the SHA256 algorithm,
    //the razorpay_payment_id and the order_id to construct a HMAC hex digest as shown below:
    const generated_signature = crypto.HmacSHA256(this.details.order_id + "|" + paymentResponse.razorpay_payment_id, this.__key);
    if (generated_signature == paymentResponse.razorpay_signature)
      {
        return true;
      }
    // return true or false according to compared result
    return false
  }

  updateOrderStatus(paymentResponse: RazorPaymentResponse){
    const isVerified = this.verifySignature(paymentResponse);
    const orderStatus = isVerified ? 'SUCCESS' : 'FAILED';

    // call payment API with status based on verifySignature() method
    // if verifySignature() return true then status = 'SUCCESS' else status = 'FAILED'
    const payload = {
      user_id: this.details.user_id,
      payment_id: paymentResponse.razorpay_payment_id,
      payment_order_id: paymentResponse.razorpay_order_id,
      payment_signature: paymentResponse.razorpay_signature,
      amount: this.amount,
      status: orderStatus
    }
      this.dataService.orderUpdateWithPayment(payload).pipe(take(1)).subscribe();

  }

}
