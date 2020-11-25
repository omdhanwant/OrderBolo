import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from "@angular/platform-browser";

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
  windowScrolled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener("window:scroll", [])

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
  ngOnInit() { }

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
  niceBytes(x) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }

  // remove file 
  deleteFile(file, i) {
    const index = i;
    this.fileLists.splice(index, 1);
  }
  // file send option
  sendOptionToggle() {
    this.sendOption = !this.sendOption;
    this.scrollToTop();
  }
  // file transfer
  transferFile(form: NgForm) {
    console.log(form.value);
  }
}
