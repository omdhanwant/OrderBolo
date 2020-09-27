import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/service/data.service';
import { Blogs } from 'src/app/models/blogs';
import { MyAccountService } from '../service/myaccount.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  animations: [
    trigger('fadeInLeftTrigger',[
      transition(':enter', [
        style({
          opacity: 0.5,
          transform: 'translateX(-200px)'
        }), animate(500)
      ])
    ]),
    trigger('fadeInTopTrigger',[
      transition(':enter', [
        style({
          opacity: 0.5,
          transform: 'translateY(-200px)'
        }), animate(500)
      ])
    ])
  ]
})
export class BlogsComponent implements OnInit {
  showAddScreen: boolean = false;
  Blogs: Blogs[];
  constructor( private service: MyAccountService , private route: Router) { }

  ngOnInit(): void {
    console.log("blog")
    this.service.getBlogs()
    .pipe(take(1))
    .subscribe((blogsData:Blogs[]) => {
      console.log(blogsData)
      this.Blogs = blogsData;
    })
  }
  getImage(image){
    if(image){
    let img = JSON.parse(image);
      return img[0].url;
    }else return 'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/pasta.jpg';
  }
}
