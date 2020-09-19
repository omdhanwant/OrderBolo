import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Users } from 'src/app/models/users';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import { MyAccountService } from 'src/app/service/myaccount.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  showAddScreen: boolean = false;
   // pagination
  // totalItems: number = 100;
  currentPage: number = 1;
  lastPageCount: number= 10;
  users :Users[];
  contentData = []
  paginatedData = []
  constructor( private service: MyAccountService) {

    // for(let i = 0 ; i < 100 ; i++){
    //   const appendNo = i+1
    //   this.contentData.push({ name: 'User ' + appendNo , description : 'description'})
    // }
    // this.paginatedData = this.contentData.slice(0, 10);
   }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.service.getAllUsers()
    .pipe(take(1))
    .subscribe((users:Users[]) => {
      // console.log(users)
      this.users = users;
      this.paginatedData = this.users;
    })
  }
  deleteUser(id){
    this.service.deleteUserById(id)
    .pipe(take(1))
    .subscribe(user => {
      alert("user deleted");
    })
  }
  showDetailScreen(){
    this.showAddScreen = true;
  }

  showDetails(){
    this.showAddScreen = true;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.contentData.slice(startItem, endItem);
  }

}
