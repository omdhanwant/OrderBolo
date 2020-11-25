import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FileTransfer';
  fileLists: any;

  ngOnInit(){
    console.log('oninit');
  }

  // file upload event
  fileEvent(event: any){
    const fileList = event.target.files;
    this.fileLists = fileList;
    console.log(fileList);
  }
  getFileExtension(file){
    const ext = file.toString().split('/');
    console.log(ext);
    return ext;
  }

  // file transfer
  transferFile(form: NgForm){
    console.log(form);
  }
}
