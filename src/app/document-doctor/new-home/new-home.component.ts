import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {
  banners:string[] = [];
  services:any[] = [];
  constructor() {
    this.banners = [
      'https://www.superfastepancard.com//Images/Slider/slider-1.png',
      'https://www.superfastepancard.com//Images/Slider/slider-2.png',
      'https://www.superfastepancard.com//Images/Slider/ituc1QKW1EGaIUR9GGYiAQ.png'
    ];

    this.services= [
      {
        name: 'Udyam Registration (Udhyod Aadhar)',
        description:'Service Description',
        image: "assets/images/document-doctor/aadhar-card.png",
        route:'/document-doctor/udhyog-aadhar'
      },
      {
        name: 'Food License Registration',
        description:'Service Description',
        image: 'assets/images/document-doctor/food-licience.png',
        route: '/document-doctor/food-licience'
      },
      {
        name: 'Shop Act (Gumsta) registration',
        description:'Service Description',
        image: 'assets/images/document-doctor/caste-validity.jpg',
        route: '/document-doctor/gumasta'
      },
      {
        name: 'GST',
        description:'Service Description',
        image: 'assets/images/document-doctor/caste-validity.jpg',
        route:'/document-doctor/gst'
      },
      {
        name: 'Digital Signature',
        description:'Service Description',
        image: 'assets/dsc/dsc-logo.jpg',
        route:'/document-doctor/dsc-application'
      },
      {
        name: 'ISO Registration',
        description:'Service Description',
        image: 'assets/iso/iso-logo.png',
        route:'/document-doctor/iso-registration'
      },
      {
        name: 'PF Registration',
        description:'Service Description',
        image: 'assets/pf/pf-logo.png',
        route:'/document-doctor/pf-registration'
      },
      {
        name: 'IEC Registration',
        description:'Service Description',
        image: 'assets/iec/iec-logo.jpg',
        route:'/document-doctor/iec-registration'
      }
    ]
   }

  ngOnInit(): void {
  }

}
