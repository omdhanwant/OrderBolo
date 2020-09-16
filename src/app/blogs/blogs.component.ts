import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import { Blogs } from 'src/app/models/blogs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  showAddScreen: boolean = false;
  Blogs: Blogs[];
  constructor( private dataService: DataService , private route: Router) { }

  ngOnInit(): void {
    this.dataService.getBlogs()
    .pipe(take(1))
    .subscribe((blogsData:Blogs[]) => {
      console.log(blogsData)
      this.Blogs = blogsData;
    })
  }
}
