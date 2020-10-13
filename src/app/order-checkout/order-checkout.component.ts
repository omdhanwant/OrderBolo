import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { CheckOutData } from '../models/documents';
import { Users } from '../models/users';
import { RazorPaymentResponse, RazorPayOrder, WindowRefService } from '../rozorpay-service/window-ref.service';
import { DataService } from '../service/data.service';
import * as crypto from "crypto-js";
import { pipe } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss'],
  providers: [WindowRefService]
})
export class OrderCheckoutComponent implements OnInit {
  details: CheckOutData
  private amount = 0; // paisa = 50 rs
  private __key ='rzp_test_p0HxOFqgEsmvhR';
  private __secret = 'jmAdrEjBSPIjRHbiloJKXefw'
  private __rezorPayOrderId: string;
  // showPaymentButton: boolean = false;

  constructor(private winRef: WindowRefService, private zone: NgZone, private dataService: DataService, private route: Router) {
    if(!this.dataService.check_out_data) {
      this.route.navigateByUrl('/document-doctor')
  }
  }

  ngOnInit(): void {

    this.details = this.dataService.check_out_data;
    this.amount= this.details.amount;

    this.dataService.getUserById(this.details.user_id).
    pipe(take(1)).subscribe( userData => {
      const user = userData[0]['data'] as Users;
      this.details.name = user.name;
      this.details.address = user.address;
      this.details.mobile = user.mobile;
      this.details.pincode = user.pin_code;

      this.createOrder();

    });
  }

  createOrder(form?: NgForm){
    if(form.valid) {
    const orderPayload ={
      user_id: this.details.user_id,
      document_id: this.details.document_id,
      order_id: 'null',
      name: this.details.name,//form.control.get('name').value,
      address: this.details.address,//form.control.get('address').value,
      city: this.details.pincode,//form.control.get('city').value,
      state: this.details.state,//form.control.get('state').value,
      pin_code: this.details.pincode,//form.control.get('pin_code').value,
      mobile: this.details.mobile,//form.control.get('mobile').value,
      amount: this.amount,
      status: 'PENDING'
  }

    return this.dataService.checkoutOrder(orderPayload)
    .subscribe( response => {
      this.__rezorPayOrderId = response['razorpay']['orderId'];
      // this.showPaymentButton = true;
    });
    }
  }

  createPayment(){
    // required for razor order creation with same order id generated in server
      this.payWithRazor(this.__rezorPayOrderId);
  }


  payWithRazor(orderId) {
    const options: any = {
      key: this.__key,
      amount: this.amount, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'vit solutions', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: orderId, // order_id created by you in backend
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
    options.handler = this.updatePaymentHandler
    options.modal.ondismiss = this.failureHandler
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

  // success response handler
  updatePaymentHandler = (response: RazorPaymentResponse) => {
    // console.log('paymentResponse ' + response)
    this.zone.run(() => this.updateOrderStatus(response));
  }

  // handle the case when user closes the form while transaction is in progress
  failureHandler = (() => {
    console.log('Transaction cancelled.');
  });


    //Use the SHA256 algorithm,
    //the razorpay_payment_id and the order_id to construct a HMAC hex digest as shown below:
    // return true or false according to compared result
  verifySignature(paymentResponse: RazorPaymentResponse){
    const generated_signature = crypto.HmacSHA256(this.__rezorPayOrderId + "|" + paymentResponse.razorpay_payment_id, this.__secret);
    const hashHex = crypto.enc.Hex.stringify(generated_signature);
    if (hashHex == paymentResponse.razorpay_signature)
      {
        return true;
      }
    return false
  }

  updateOrderStatus(paymentResponse: RazorPaymentResponse){
    const isVerified = this.verifySignature(paymentResponse);

    const orderStatus = isVerified ? 'SUCCESS' : 'FAILED';

    // call payment API with status based on verifySignature() method
    // if verifySignature() return true then status = 'SUCCESS' else status = 'FAILED'
    const payload = {
      user_id: this.details.user_id,
      document_id: this.details.document_id,
      payment_id: paymentResponse.razorpay_payment_id,
      payment_order_id: paymentResponse.razorpay_order_id,
      payment_signature: paymentResponse.razorpay_signature,
      amount: this.amount,
      status: orderStatus
    }
      this.dataService.orderUpdateWithPayment(payload).pipe(take(1)).subscribe(
        () => {
          if( orderStatus === 'SUCCESS' ) {
            console.log('Order Successfully updated with status ' + orderStatus)
          } else if( orderStatus === 'FAILED' ){
            console.log('Order Successfully updated with status ' + orderStatus)
          }

          this.route.navigateByUrl('/order-success-page')
        }
      );

  }

}
