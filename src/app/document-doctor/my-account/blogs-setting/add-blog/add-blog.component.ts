import { EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  @Input() data
  @Output() onBackClick = new EventEmitter<boolean>();
  myFile: File;
  constructor() { }

  ngOnInit(): void {
  }

  save(form){

  }
  onFileChange(event){
    this.myFile = event.target.files[0];
  }

  back(){
    this.onBackClick.emit(false);
  }

}
