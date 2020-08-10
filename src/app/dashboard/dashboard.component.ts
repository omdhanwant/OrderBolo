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

  ngOnInit() {
    console.log('oninit');
  }

  slides = [
    {img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_category,q_auto:low,f_auto/categories/category_v2/category_72f53df0.png"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_category,q_auto:low,f_auto/categories/category_v2/category_72f53df0.png"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_category,q_auto:low,f_auto/categories/category_v2/category_72f53df0.png"},
  ];
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4, "dots": true, "infinite": true,};
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

}
