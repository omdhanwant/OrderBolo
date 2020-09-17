import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  showAddScreen: boolean = false;
  users = [];
  constructor() {
    this.users = [
      { name: 'User1' , description : 'description'},
      { name: 'User2' , description : 'description'},
      { name: 'User3' , description : 'description'}
    ]

  }

  ngOnInit(): void {
  }

  showDetailScreen(){
    this.showAddScreen = true;
  }

  showDetails(){
    this.showAddScreen = true;
  }

}
