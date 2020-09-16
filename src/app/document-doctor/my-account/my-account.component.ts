import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/models/authData';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.peekAuthentication()
    .subscribe(auth => {
      if(auth && auth.user.userType === 'super-admin'){
          this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }




}
