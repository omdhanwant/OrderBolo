import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Blogs } from 'src/app/models/blogs';
import { MyAccountService } from 'src/app/service/myaccount.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  documentsBlogsList: any[];
  selectedCountry: any[];
  query:string;
  constructor(private service: MyAccountService) { }
  blogs:Blogs[]
  ngOnInit(): void {
    this.blogs = [];
    this.service.getBlogs()
    .pipe(take(1))
    .subscribe((blogsData:Blogs[]) => {
      this.blogs = blogsData;

      // generate autocomplete dropdown data
      this.documentsBlogsList = [
        {"name": "Udhyog Aadhar", "redirectUrl" : "/document-doctor/udhyog-aadhar", "category": "Document"},
        {"name": "Food Lisence", "redirectUrl" : "/document-doctor/food-licience", "category": "Document"},
        {"name": "Gumasta", "redirectUrl" : "/document-doctor/gumasta", "category": "Document"},
        {"name": "GST", "redirectUrl" : "/document-doctor/gst", "category": "Document"},
    ];

    this.blogs.forEach(blog => {
      this.documentsBlogsList.push(
        {"name": blog.data.title, "redirectUrl" : "/blogs/blog/" + blog.data.id, "category": "Blog"}
      )
    })
    })

  }

  filterCategory(event) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side

      if(event.query) {
       this.selectedCountry =  this.documentsBlogsList.filter(d => d.name.toLowerCase().includes(event.query.toLowerCase()))
      }


    // console.log(this.selectedCountry)
  }


}
