import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'show-form-details',
  templateUrl: './show-form-details.component.html',
  styleUrls: ['./show-form-details.component.scss']
})
export class ShowFormDetailsComponent implements OnInit {
  @Input() labelValueData: any[];
  constructor() { }

  ngOnInit(): void {
  }

}
