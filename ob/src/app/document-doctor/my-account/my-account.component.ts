import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import * as constants from '../../service/constants';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isVendor: boolean = false;
  openSideNav = true;
  sideNavWidth = '270px';
  containerMargin = '270px';
  destroy$: Subscription
  constructor(private auth: AuthService) { }

  ngOnDestroy(){
    if(this.destroy$)
      this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
   this.destroy$ = this.auth.peekAuthentication()
    .subscribe(auth => {

      if(auth && auth?.user) {
        switch(auth.user.userType) {
          case constants.SUPER_ADMIN:
              this.isAdmin = true;
              break;
        case constants.VENDOR:
              this.isVendor = true;
              break;
        }
      }
    });
  }


  toggleSideNav(){
    this.openSideNav = !this.openSideNav;
      this.sideNavWidth = this.openSideNav ? '270px' : '60px';
      this.containerMargin = this.openSideNav ? '270px' : '60px';

  }


}
