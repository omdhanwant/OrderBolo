import { EventEmitter } from '@angular/core';
import { Input, Output, ViewChild  } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Blogs } from 'src/app/models/blogs';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { DocumentService } from 'src/app/service/document.service';

@Component({
  selector: 'add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  @ViewChild('form',{static: false}) form: NgForm;
  @Input() data: Blogs
  @Output() onBackClick = new EventEmitter<boolean>();
  @Output() onSuccess = new EventEmitter<boolean>();
  myFiles:File [] = [];
  user_id: number;
  editMode: boolean = false;
  constructor(private auth: AuthService, private service: DocumentService, private dataService: DataService , private route: Router) { }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  ngAfterViewInit() {
    if(this.data) {
      this.editMode = true;
      let tags = this.data.tags.split(',');

      setTimeout(() => {
        this.form.setValue({
          title: this.data.title,
          tags: tags,
          description: this.data.description
        })
      },200);
    }
  }


  ngOnInit(): void {
    this.auth.peekAuthentication()
    .pipe(take(1)).subscribe(auth => {
      if(auth && auth.isAuthenticated){
        this.user_id = auth.user.id
        }
    });

  }

  save(form: NgForm){
    let formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("blog_photo[]", this.myFiles[i]);
    }
      formData.append('title', form.control.get('title').value)
      formData.append('description', form.control.get('description').value)
      formData.append('tags', form.control.get('tags').value)
      this.saveForm(formData);
  }

  saveForm(payload) {
    this.service.saveBlog(payload)
      .subscribe((response) => {
        // this.route.navigateByUrl('/my-account/blogs-setting')
        this.onSuccess.emit(true);
        this.back()
      })
  }

  back(){
    this.onBackClick.emit(false);
  }

}
