import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-requested-documents',
  templateUrl: './requested-documents.component.html',
  styleUrls: ['./requested-documents.component.scss']
})
export class RequestedDocumentsComponent implements OnInit {
  // docs = []

  // pagination
  // totalItems: number = 100;
  currentPage: number = 1;
  lastPageCount: number= 10;

  contentData = []
  paginatedData = []
  constructor() {

    for(let i = 0 ; i < 100 ; i++){
      const appendNo = i+1
      this.contentData.push({ name: 'Document ' + appendNo , description : 'description'})
    }
    this.paginatedData = this.contentData.slice(0, 10);
   }

  ngOnInit(): void {
  }


  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.contentData.slice(startItem, endItem);
  }
}
