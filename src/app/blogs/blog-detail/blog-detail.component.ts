import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyAccountService } from 'src/app/service/myaccount.service';
import { take } from 'rxjs/operators';
import { BlogById, Blogs } from 'src/app/models/blogs';
import { Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  paramId: string;
  Blog:BlogById[] = [];
  private _lightBoxAlbums:any[]= [];

  constructor(private activatedRoute: ActivatedRoute, private service: MyAccountService, private _lightbox: Lightbox) {
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getBlogById(this.paramId);
  }

  getBlogById(id){
    this.service.getBlogById(id)
    .pipe(take(1))
    .subscribe((blogs) => {
      console.log(blogs)
      this.Blog = blogs;

      this.fetchLightBoxAlbums(this.Blog[0].data.blog_photo)
    })
  }
  getImages(photos){
    if(photos){
      return JSON.parse(photos);
    }
    return [];
  }

  fetchLightBoxAlbums(photos){
    let urls = this.getImages(photos);
    urls.forEach( (url, i) => {
      const src = url.url;
      const caption = i + 1
      const thumb = url.url;
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._lightBoxAlbums.push(album);
      console.log(this._lightBoxAlbums);
    })
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._lightBoxAlbums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
