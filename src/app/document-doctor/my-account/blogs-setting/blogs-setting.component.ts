import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { DocumentService } from 'src/app/service/document.service';
import { Blogs } from 'src/app/models/blogs';
@Component({
  selector: 'app-blogs-setting',
  templateUrl: './blogs-setting.component.html',
  styleUrls: ['./blogs-setting.component.scss']
})
export class BlogsSettingComponent implements OnInit {
  showAddScreen: boolean = false;
  Blogs: Blogs[];
  constructor(private auth: AuthService, private service: DocumentService, private dataService: DataService , private route: Router) { }

  ngOnInit(): void {
    this.auth.peekAuthentication()
    .pipe(take(1)).subscribe(auth => {
      if(auth && auth.isAuthenticated){
        this.dataService.getBlogs()
        .pipe(take(1))
        .subscribe((blogsData:Blogs[]) => {
          console.log(blogsData)
          this.Blogs = blogsData;
          // setTimeout(() => {
          //   this.form.setValue({
          //     name: user['name'] ? user['name'] : '',
          //     email: user['email'] ? user['email'] : '',
          //     dob: user['dob'] ? new Date(user['dob']) : '',
          //     pin_code: user['pin_code'] ? user['pin_code'] : '',
          //     address: user['address'] ? user['address'] : '',
          //     mobile: user['mobile'] ? user['mobile'] : ''
          //   })
          // }, 500);

        })
      }
    });

  }

  showDetailScreen(){
    this.showAddScreen = true;
  }

  showDetails(){
    this.showAddScreen = true;
  }

}
