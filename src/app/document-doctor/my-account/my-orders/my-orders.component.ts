import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Users } from 'src/app/models/users';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import { MyAccountService } from 'src/app/service/myaccount.service';
import { Orders } from 'src/app/models/orders';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  // orders =[];
    // pagination
  itemsPerPage: number = 50;
  currentPage: number = 1;
  lastPageCount: number;

  orders :Orders[];
  // contentData = []
  paginatedData = []
  constructor( private service: MyAccountService) {
  }

  initData(){
    this.orders = [];
    this.paginatedData = [];
  }

  ngOnInit(): void {
    this.initData();
    this.getAllOrders();
  }

  getAllOrders(){
    this.service.getAllOrders()
    .pipe(take(1))
    .subscribe((users:Orders[]) => {
      // console.log(users)
      this.orders = users;
      this.paginatedData = this.orders.slice(0, 10);
    })
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.orders.slice(startItem, endItem);
  }

}
