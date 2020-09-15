import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  @Input('show') display: boolean = false;
  @Input() showHeader: boolean = false;
  @Input() showFooter: boolean = false;
  @Input() headerText: string;
  @Input() footerText: string;
  @Input() message: string;
  @Input() customClassName: string;
  constructor() { }

  ngOnInit(): void {
  }

}
