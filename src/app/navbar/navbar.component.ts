import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AuthService } from '../service/auth.service';
import { OtpData, VerifyOtpData } from '../models/authData';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInLeftTrigger',[
      transition(':enter', [
        style({
          opacity: 1,
          transform: 'translateX(-200px)'
        }), animate('1s')
      ])
    ]),

    trigger('sideNavTrigger', [
      state('open',style({
        // width: '*',
        // height:  '*',
        opacity: 1
      })),
    state('close',style({
      transform: 'translateX(500px)',
      // width: '0',
      opacity: '0'
  })),

  transition('open => close' ,animate(300)),
  transition('close => open' ,animate(300))
    ])

  ]
})
export class NavbarComponent implements OnInit {
  @ViewChild('phone' ,{static: false}) mobileNumber: FormControl;

  myForm:string = 'login'
  isSideNav = false;
  isOTPNav = false;
  rememberMe = false;
  otp
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  // validateNumber(){
  //   this.isOTPNav = true;
  // }
  check(event){
    console.log(event);
  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  // generate OTP
  getOtp(mobileNumber){
    // vlaidations
    if(!mobileNumber){
      //handle error by giving alert
      return
    }
    this.auth.generateOtp({mobile: mobileNumber})
      .subscribe( (authData: OtpData) => {
         console.log(authData);
         this.isOTPNav = true;
      });
  }

  confirmOtp(mobileNumber){
      if(!mobileNumber || !this.otp){
        //handle error by giving alert
        return
      }
    this.auth.verifyOtp({mobile: mobileNumber, otp: this.otp})
    .subscribe( (data) => {
       console.log(data);
       this.isOTPNav = false;
       this.mobileNumber.setValue(null);
       this.isSideNav = false;
    });
  }
}
