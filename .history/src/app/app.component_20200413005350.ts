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
    console.log('ok');
    console.log(event);
  }

  // file transfer
  transferFile(form: NgForm){
    console.log(form);
  }
}
