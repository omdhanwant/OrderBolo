import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FileTransfer';
  fileLists: any;
  sendOption = false;
  sendRadio = 'emailTransfer';
  constructor(){

  }

  ngOnInit() {
    console.log('oninit');
  }

  // file upload event
  fileEvent(event: any) {
    const fileList = event.target.files;
    this.fileLists = fileList;
    console.log(fileList);
  }
  // get file extension
  getFileExtension(file) {
    const ext = file.toString().split('/')[1];
    return ext;
  }
  
  // convert file size
  niceBytes(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;

    while(n >= 1024 && ++l){
        n = n / 1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

  // remove file 
  deleteFile(file, i){
    const index = i;
    this.fileLists.splice(index, 1);
  }
  // file send option
  sendOptionToggle(){
    var element = document.getElementById('form-footer');
   element.scrollTop = 400 - element.clientHeight;
   console.log(element.scrollHeight);
   console.log(element.clientHeight);
   console.log(element.scrollTop);
    this.sendOption  = !this.sendOption;
  }
  // file transfer
  transferFile(form: NgForm) {
    console.log(form.value);
  }
}
