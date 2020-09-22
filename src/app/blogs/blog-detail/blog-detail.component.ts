import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  paramId: string;
  constructor(private activatedRoute: ActivatedRoute) {
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

}
