import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requested-documents',
  templateUrl: './requested-documents.component.html',
  styleUrls: ['./requested-documents.component.scss']
})
export class RequestedDocumentsComponent implements OnInit {
  docs = []
  constructor() {
    this.docs = [
      { name: 'Document1' , description : 'description'},
      { name: 'Document2' , description : 'description'},
      { name: 'Document3' , description : 'description'}
    ]
   }

  ngOnInit(): void {
  }

}
