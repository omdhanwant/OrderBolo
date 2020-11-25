import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FileTransfer';

  ngOnInit(){
    console.log('oninit');
  }

  // file upload event
  fileEvent(event: any){
    const fileList = event.target.files;
    console.log(fileList);
  }

  // file transfer
  transferFile(form: NgForm){
    console.log(form);
  }
}
