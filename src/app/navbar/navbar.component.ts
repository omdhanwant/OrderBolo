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

  transition('open => close' ,animate(500)),
  transition('close => open' ,animate(500))
    ])

  ]
})
export class NavbarComponent implements OnInit {
  myForm:string = 'login'
  toggleSideNav = false;
  rememberMe = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.toggleSideNav = !this.toggleSideNav;
  }
  openNav() {
    // document.getElementById("mySidenav").style.width = "350px";
  }

  closeNav() {
    // document.getElementById("mySidenav").style.width = "0";
  }

  check(event){
    console.log(event);
  }

}
