import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filteredCountries: any[];
  selectedCountry:any[];
  constructor() { }

  ngOnInit(): void {
  }

  filterCountry(event) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      // let filtered : any[] = [];
      // let query = event.query;
      // for(let i = 0; i < this.countries.length; i++) {
      //     let country = this.countries[i];
      //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
      //         filtered.push(country);
      //     }
      // }
    
      this.filteredCountries = [ 
        {"name": "Aadhar Card", "code": "category"}, 
        {"name": "Pan Card", "code": "category"}, 
        {"name": "Gumasta", "code": "category"}, 
        {"name": "Police Verification", "code": "category"}, 
        {"name": "Udyog Aadhar", "code": "category"}, 
        {"name": "Food Licience", "code": "category"},
    ];
    console.log(this.selectedCountry)
  }
}
