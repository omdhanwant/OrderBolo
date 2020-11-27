import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
import { Blogs } from 'src/app/models/blogs';
import { DocumentService } from 'src/app/service/document.service';
import { MyAccountService } from 'src/app/service/myaccount.service';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {
  banners: string[] = [];
  services: any[] = [];
  documentsBlogsList: any[] = [];
  selectedFilter: any[] = [];
  query: string;
  blogs: Blogs[] = [];
  constructor(private service: MyAccountService, private documentService: DocumentService) {
    this.banners = [
      'https://www.superfastepancard.com//Images/Slider/slider-1.png',
      'https://www.superfastepancard.com//Images/Slider/slider-2.png',
      'https://www.superfastepancard.com//Images/Slider/ituc1QKW1EGaIUR9GGYiAQ.png'
    ];

    this.services = this.documentService.services;

    // generate autocomplete dropdown data for documents
    this.services.forEach(service => {
      this.documentsBlogsList.push({
        name: service.name,
        redirectUrl: service.route,
        category: 'Document'
      })
    })

  }

  
  ngOnInit(): void {
    this.blogs = [];
    this.service.getBlogs()
      .pipe(take(1))
      .subscribe((blogsData: Blogs[]) => {
        this.blogs = blogsData;


        this.blogs.forEach(blog => {
          this.documentsBlogsList.push(
            { "name": blog.title, "redirectUrl": "/blogs/blog/" + blog.id, "category": "Blog" }
          )
        })
      })
  }
  filterCategory(event) {
    if (event.query) {
      this.selectedFilter = this.documentsBlogsList.filter(d => d.name.toLowerCase().includes(event.query.toLowerCase()))
    }
  }

}
