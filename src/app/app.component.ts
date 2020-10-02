import { Component, OnInit,OnDestroy } from '@angular/core';
import { UtilService } from './service/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
declare var $;
let context;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isRedirectUrl = false;
  routeSubscription: Subscription
  constructor(public utilService: UtilService, private activatedRoute: ActivatedRoute, private router: Router){
  }

  ngOnDestroy(){
    if(this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    context = this;
    console.log(context);

    this.routeSubscription = this.activatedRoute.queryParamMap.subscribe(query => {
      if(query.has('returnUrl') && query.get('returnUrl')!="" && query.get('returnUrl')!= null) {
        this.openModal();
        this.isRedirectUrl = true;
      } else {
        this.closeModal();
        this.isRedirectUrl = false;
      }
    })
  }

  openModal(){
    $('#login-modal').modal('show');
  }

  closeModal() {
    $('#login-modal').modal('hide');
  }

}
