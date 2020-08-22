import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

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
      state('open',style({})),
    state('close',style({

      transform: 'translateX(500px)'
  })),

  transition('open => close' ,animate(300)),
  transition('close => open' ,animate(300))
    ])

  ]
})
export class NavbarComponent implements OnInit {
  myForm:string = 'login'
  isSideNav = false;
  isOTPNav = false;
  rememberMe = false;
  otp
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

  validateNumber(){
    this.isOTPNav = true;
  }
  check(event){
    console.log(event);
  }


  onOtpChange(otp) {
    this.otp = otp;
  }
}
