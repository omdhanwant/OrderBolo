import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders =[];
  constructor() {
    this.orders = [
      { name: 'Order1' , description : 'description'},
      { name: 'Order2' , description : 'description'},
      { name: 'Order3' , description : 'description'}
    ]
  }

  ngOnInit(): void {
  }

}
