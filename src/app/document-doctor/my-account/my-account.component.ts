import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import * as constants from '../../service/constants';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  isAdmin: boolean = false;
  openSideNav = true;
  sideNavWidth = '270px';
  containerMargin = '270px';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.peekAuthentication()
    .subscribe(auth => {
      if(auth && auth.user.userType === constants.SUPER_ADMIN){
          this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }


  toggleSideNav(){
    this.openSideNav = !this.openSideNav;
      this.sideNavWidth = this.openSideNav ? '270px' : '60px';
      this.containerMargin = this.openSideNav ? '270px' : '60px';

  }


}
