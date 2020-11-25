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
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Fiat', value: 'Fiat'},
        {label: 'Ford', value: 'Ford'},
        {label: 'Ford1', value: 'Ford'},
        {label: 'Ford', value: 'Ford'},
    ];
  }

  ngOnInit(): void {
  }

}
