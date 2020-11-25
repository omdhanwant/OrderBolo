import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss']
})
export class AlertPopupComponent implements OnInit {
  @Input() message: string;
  @Input() title: string;
  @Input() showOkbutton: boolean = false;
  @Input() showCancelbutton: boolean =  false;
  @Input() okButtonName: string;
  @Input() cancelButtonName: string;
  @Input() okButtonColor: string;
  @Input() cancelButtonColor: string;

  @Output() onOkButtonClick = new EventEmitter<any>();
  @Output() onCancelButtonClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  // getOkButtonColorClass(){
  //   return  {
  //     'background-color': this.okButtonColor + '!important'
  //   }
  // }

  // getCancelButtonColorClass(){
  //   return  {
  //     'background-color': this.cancelButtonColor + '!important'
  //   }
  // }

  okButtonClicked(){
    this.onOkButtonClick.emit(true);
  }

  cancelButtonClicked(){
    this.onCancelButtonClick.emit(true);
  }

}
