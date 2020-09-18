import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { DocumentService } from 'src/app/service/document.service';
import { Blogs } from 'src/app/models/blogs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-blogs-setting',
  templateUrl: './blogs-setting.component.html',
  styleUrls: ['./blogs-setting.component.scss']
})
export class BlogsSettingComponent implements OnInit {
  showAddScreen: boolean = false;
  Blogs: Blogs[];

  currentPage: number = 1;
  lastPageCount: number= 10;

  // contentData = []
  paginatedData:Blogs[] = []
  constructor(private auth: AuthService, private service: DocumentService, private dataService: DataService , private route: Router) { }

  ngOnInit(): void {
    this.Blogs = [];
    this.paginatedData = [];
    this.auth.peekAuthentication()
    .pipe(take(1)).subscribe(auth => {
      if(auth && auth.isAuthenticated){
        this.dataService.getBlogs()
        .pipe(take(1))
        .subscribe((blogsData:Blogs[]) => {
          console.log(blogsData)
          this.Blogs = blogsData;
          this.paginatedData = this.Blogs.slice(0, 10);
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

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.Blogs.slice(startItem, endItem);
  }

}
