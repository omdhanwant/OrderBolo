import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  viewDetails: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showDetails() {
    this.viewDetails = false;
    setTimeout(() => {
        this.viewDetails = true;
    }, 1000);
  }

}
