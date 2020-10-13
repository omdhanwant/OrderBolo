import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { DocumentService } from 'src/app/service/document.service';
import { UtilService } from 'src/app/service/util.service';
declare var $;

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
  lastPageCount: number;
  itemsPerPage: number = 50;

  contentData = []
  paginatedData = []
  documentsMap: Map<string, any[]>

  documents: string[] //= ['Udhyog Aadhar', 'Food License' , 'Gumasta', 'GST']
  selectedDocument: string;
  documentModalData: any;
  documentModaLableValue: {label: string ; value:string }[]
  constructor(private service: DocumentService, private auth: AuthService, private utilService: UtilService) {}

  ngOnInit(): void {
    this.contentData = [];
    this.paginatedData = [];
    this.documents = [];
    this.documentsMap = new Map();
    this.service.getRequstedDouments(this.auth.userInfo.id)
      .pipe(take(1))
      .subscribe( response => {
        console.log(response[0])
        // all document names
          this.documents = Object.keys(response[0]);
          // set data against each document name
          this.documents.forEach(doc => {
            this.documentsMap.set(doc, response[0][doc]);
          });

          this.selectedDocument = this.documents[0];
          this.initPaginationData(this.documents[0]);
      })
  }


  initPaginationData(document: string) {
      this.currentPage = 1;
      this.contentData = []
      this.paginatedData = []

      // refresh API with new data as per document name
      this.contentData = this.documentsMap.get(document)
      this.paginatedData = this.contentData.slice(0, 10);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedData = this.contentData.slice(startItem, endItem);
  }


  onTabChange(event){
    this.selectedDocument = this.documents[event.index];
    this.initPaginationData(this.documents[event.index])
  }

  showDetails(detail){
    this.documentModaLableValue = []
    $('#detail_modal').modal();
    // this.documentModalData = detail;
    const keys = Object.keys(detail);

    keys.forEach(key => {
      const label = this.utilService.titleCase(key.split('_').join(' '));
      const lowercase_label = label.toLowerCase();
      const not_required_label = (lowercase_label.includes('updated') || lowercase_label.includes('created') || lowercase_label.includes('file') || lowercase_label.includes('id'))
      if(!not_required_label) {
        this.documentModaLableValue.push({label: label , value: detail[key] })
      }
    });
  }
}
