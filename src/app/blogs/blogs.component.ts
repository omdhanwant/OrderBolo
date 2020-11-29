import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Blogs } from 'src/app/models/blogs';
import { MyAccountService } from '../service/myaccount.service';
import { fadeInLeftTrigger, fadeInTopTrigger } from '../animations';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  animations: [
    fadeInLeftTrigger,
    fadeInTopTrigger
  ]
})
export class BlogsComponent implements OnInit {
  showAddScreen: boolean = false;
  Blogs: Blogs[];
  latestBlog: Blogs;
  constructor( private service: MyAccountService , private route: Router) { }

  ngOnInit(): void {
    this.service.getBlogs()
    .pipe(take(1))
    .subscribe((blogsData:Blogs[]) => {
      this.Blogs = blogsData;

      this.latestBlog = this.getLatestBlog();

    })
  }

  getLatestBlog() {
    return this.Blogs.sort((a,b) => {
      if(a.data.created_at > b.data.created_at) return 1;
      if(a.data.created_at < b.data.created_at) return -1;
    })[0]
  }

  getImage(image){
    if(image){
    let img = JSON.parse(image);
      return img[0].url;
    }else return 'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/pasta.jpg';
  }
}
