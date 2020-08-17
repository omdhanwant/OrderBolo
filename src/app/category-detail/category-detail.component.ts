import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
  animations: [
    trigger('buttonAnimation', [
      // state('open', style({
      //   height: '200px',
      //   opacity: 1,
      //   backgroundColor: 'yellow'
      // })),
      // state('closed', style({
      //   height: '100px',
      //   opacity: 0.5,
      //   backgroundColor: 'green'
      // })),
      // transition('open => closed', [
      //   animate('1s')
      // ]),
      // transition('closed => open', [
      //   animate('0.5s')
      // ]),

      transition(':enter', [
        style({
        height: '*',
        opacity: 0.5,
        backgroundColor: 'gray'
        }),
        animate('1000ms')
      ])
    ])
  ]
})
export class CategoryDetailComponent implements OnInit {
  viewDetails: boolean = false;

  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0)
  }

  showDetails() {
    this.viewDetails = false;
    setTimeout(() => {
        this.viewDetails = true;
    }, 500);
  }

}
