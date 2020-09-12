import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs-setting',
  templateUrl: './blogs-setting.component.html',
  styleUrls: ['./blogs-setting.component.scss']
})
export class BlogsSettingComponent implements OnInit {
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
