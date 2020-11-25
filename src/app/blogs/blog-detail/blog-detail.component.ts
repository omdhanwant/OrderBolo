import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyAccountService } from 'src/app/service/myaccount.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Blogs } from 'src/app/models/blogs';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  paramId: string;
  Blog:Blogs;

  constructor(private activatedRoute: ActivatedRoute, private service: MyAccountService) {
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getBlogById(this.paramId);
  }

  getBlogById(id){
    this.service.getBlogById(id)
    .pipe(take(1))
    .subscribe((blogs:Blogs) => {
      console.log(blogs)
      this.Blog = blogs;
    })
  }
  getImage(image){
    if(image){
      return JSON.parse(image);
    }else null;
  }

}
