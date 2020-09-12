import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  showAddScreen: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showDetailScreen(){
    this.showAddScreen = true;
  }

  showDetails(){
    this.showAddScreen = true;
  }

}
