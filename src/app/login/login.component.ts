import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alertService';
import { DataService } from '../service/data.service';
import { OtpData, User, AuthUser } from '../models/authData';
import { take } from 'rxjs/operators';
import { NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {
  @ViewChild('phone' ,{static: false}) mobileNumber: NgModel;
  isSideNav = true;
  isOTPNav = false;
  rememberMe = false;
  otp = null;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '30px',
      'height': '30px'
    }
  };
  userData:string;
  authUser: AuthUser = null;
  constructor(private auth: AuthService, private alertService: AlertService, public dataService: DataService, private route: Router, private activated:ActivatedRoute) {
    // this.isAuthenticated = this.auth.isAuthenticated();
    // this.alert = this.alertService.getAlertInstance();

    if(this.auth.isAuthenticated()) {
      this.route.navigateByUrl('/home')
    }
  }

  ngOnInit(): void {
    window.scroll(0,0);
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
         this.isSideNav = false;
      });
  }

  confirmOtp(mobileNumber){
      if(!mobileNumber || !this.otp){
        //handle error by giving alert
        return
      }
    this.auth.verifyOtp({mobile: mobileNumber, otp: this.otp})
    .pipe(take(1))
    .subscribe( (user: User) => {
       console.log(user);
       this.userData = user.mobile
      //  this.isAuthenticated = this.auth.isAuthenticated();


      this.initDataAfterLogin();
      this.showAlert("Successfully Logged In");

      let returnUrl = this.activated.snapshot.queryParamMap.get('returnUrl') || '/'
      this.navigate(returnUrl);
    });
  }

  logOut(){
      this.auth.logOut();
      // this.isAuthenticated = this.auth.isAuthenticated();
      this.showAlert("Successfully Logged Out");
  }

  showAlert(message){
    alert(message);
    // this.alert({
    //   buttons: ["OK"],
    //    icon: 'success',
    //    text: message,
    //    timer: 2000,
    //    closeOnClickOutside: false,
    //  })
  }


  initDataAfterLogin() {
    this.mobileNumber.control.setValue(null);
    this.isSideNav = false;
    this.isOTPNav = false;
  }

  navigate(url) {
      this.route.navigateByUrl(url);
  }
}
