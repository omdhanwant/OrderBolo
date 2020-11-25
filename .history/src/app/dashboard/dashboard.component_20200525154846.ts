import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  city:any = [];
  selectedCity: string = 'BMW';


  constructor() { 
    
    this.city = [
        {label: 'Nagpur', value: 'Audi'},
        {label: 'Amaravati', value: 'BMW'},
        {label: 'Washim', value: 'Fiat'},
    ];
  }

  ngOnInit(): void {
  }

}
