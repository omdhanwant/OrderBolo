import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AuthService } from '../service/auth.service';
import { OtpData, User, AuthUser } from '../models/authData';
import { NgModel } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AlertService } from '../service/alertService';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
// declare var $;
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
  @ViewChild('phone' ,{static: false}) mobileNumber: NgModel;

  myForm:string = 'login'
  isSideNav = false;
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
  authUser: AuthUser;
  displayAlert: boolean = false;
  message = ''

  lastScrollTop = 0;
  scrolledUp: boolean = false;

  constructor(private auth: AuthService, public dataService: DataService, private route: Router) {
    this.auth.peekAuthentication()
    .subscribe(auth => {
      if(auth){
        this.authUser = auth
      } else {
        this.authUser = {
          user: null,
          isAuthenticated: false
        };
      }

    });
  }
  ngOnInit() {
      // window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  ngOnDestroy() {
      // window.removeEventListener('scroll', this.scroll, true);
  }


scroll = (event: Event): void => {
  let st = document.getElementById('app').scrollTop;
  console.log(st);
  console.log(this.lastScrollTop);
   if (st > this.lastScrollTop){
       // downscroll code
      this.scrolledUp = false;
   } else {
      // upscroll code
      this.scrolledUp = true;
   }
   this.lastScrollTop = st;
};

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
         this.isOTPNav = true;
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
    });
  }

  logOut(){
      this.auth.logOut();

      // this.isAuthenticated = this.auth.isAuthenticated();
      this.showAlert("Successfully Logged Out");
      this.route.navigateByUrl('/document-doctor');
  }

  showAlert(message){
    // alert(message);
    this.displayAlert = true;
    this.message = message;
    setTimeout(() => {
        this.displayAlert = false;
    }, 2000);
  }

  // closeAlertModal(){
  //   $("#alertPopup").modal("close");
  // }


  initDataAfterLogin() {
    this.mobileNumber.control.setValue(null);
    this.isSideNav = false;
    this.isOTPNav = false;
  }
}
