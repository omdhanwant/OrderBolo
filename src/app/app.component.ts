import { Component, OnInit,OnDestroy, Renderer2 } from '@angular/core';
import { UtilService } from './service/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { routeAnimation } from './animations';
declare var $;
// let context;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  isRedirectUrl = false;
  routeSubscription: Subscription
  routedetection: Subscription
  constructor(public utilService: UtilService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2){
  }


  ngAfterViewInit(){
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }

  ngOnDestroy(){
    if(this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if(this.routedetection) {
      this.routedetection.unsubscribe();
    }
  }

  ngOnInit() {
    // context = this;
    // console.log(context);
    this.routedetection = this.router.events.subscribe(val => {
      window.scroll(0,0);
    });

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
