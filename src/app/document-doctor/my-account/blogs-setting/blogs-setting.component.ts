import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { Blogs } from 'src/app/models/blogs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MyAccountService } from 'src/app/service/myaccount.service';
import { AlertService } from 'src/app/service/alertService';
@Component({
  selector: 'app-blogs-setting',
  templateUrl: './blogs-setting.component.html',
  styleUrls: ['./blogs-setting.component.scss'],
})
export class BlogsSettingComponent implements OnInit {
  showAddScreen: boolean = false;
  Blogs: Blogs[];

  currentPage: number = 1;
  lastPageCount: number = 10;

  // contentData = []
  paginatedData: Blogs[] = [];
  blodId; // id to delete
  selectedBlog:Blogs
  constructor(private auth: AuthService, private service: MyAccountService, private alert: AlertService) {}

  ngOnInit(): void {
    this.initData();

    this.auth
      .peekAuthentication()
      .pipe(take(1))
      .subscribe((auth) => {
        if (auth && auth.isAuthenticated) {
          this.service
            .getBlogs()
            .pipe(take(1))
            .subscribe((blogsData: Blogs[]) => {
              console.log(blogsData);
              this.Blogs = blogsData;
              this.paginatedData = this.Blogs.slice(0, 10);
            });
        }
      });
  }

  initData() {
    this.currentPage = 1;
    this.Blogs = [];
    this.paginatedData = [];
    this.blodId = null;
    this.selectedBlog = undefined;
  }

  showDetailScreen() {
    this.showAddScreen = true;
  }

  showDetails(blog) {
    this.selectedBlog = blog
    this.showAddScreen = true;
  }

  onSaved() {
    this.showAddScreen = false;
    this.selectedBlog = null;
    this.reload();
  }

  deleteBlog(id){
    this.service.deleteBlog(id)
      .subscribe(res => {
            this.alert.addSingle('success','Message','Blog Successfully Deleted!');
            this.reload();
      })
  }

  reload() {
    this.service.refreshBlogsData();
    this.ngOnInit();
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.Blogs.slice(startItem, endItem);
  }
}
