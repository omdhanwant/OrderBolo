import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input() data
  @Output() onBackClick = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  save(form){}

  back(){
    this.onBackClick.emit(false);
  }
}
