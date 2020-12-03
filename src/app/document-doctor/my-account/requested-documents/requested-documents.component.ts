import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { take } from 'rxjs/operators';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/service/auth.service';
import { DocumentService } from 'src/app/service/document.service';
import { MyAccountService } from 'src/app/service/myaccount.service';
import { UtilService } from 'src/app/service/util.service';
import * as constant from 'src/app/service/constants';

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
  documentModaLableValue: {type: string, label: string ; value:any }[]

  selectedDocumentIds: string[] = [];
  vendorsOptions = [];
  selectedVendor;
  isCommon = true;
  constructor(private service: DocumentService, private accountService: MyAccountService, private auth: AuthService, private router: Router, private utilService: UtilService) {}

  ngOnInit(): void {
    this.contentData = [];
    this.paginatedData = [];
    this.documents = [];
    this.documentsMap = new Map();
    this.documentModaLableValue = [];
    this.selectedDocumentIds = [];
    this.vendorsOptions = [];
    this.selectedVendor = null;

    if(this.auth.isAuthenticated()) {
      if(this.auth.userInfo.userType != constant.VENDOR && this.auth.userInfo.userType != constant.SUPER_ADMIN) {
        this.isCommon = true;
      } else {
        this.isCommon = false;
      }
    }

    this.service.getRequstedDouments(this.auth.userInfo.id)
      .pipe(take(1))
      .subscribe( response => {
        // console.log(response[0])
        // all document names
          this.documents = Object.keys(response[0]);
          // set data against each document name
          this.documents.forEach(doc => {
            if(response[0][doc] && response[0][doc].length) {
              response[0][doc] = response[0][doc].map(d =>  ({...d, selected: false }));
            }
            this.documentsMap.set(doc, response[0][doc]);
          });

          this.selectedDocument = this.documents[0];
          this.initPaginationData(this.documents[0]);


          this.accountService.getAllUsers()
            .pipe(take(1))
            .subscribe((users:Users[]) => {
              // console.log(users)
              this.vendorsOptions = users.filter(u => u.user_type == 'vendor').map(v => ({label: v.name , value: v.id }));
              // this.paginatedData = this.users;
            })
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
    let files = [];

    keys.forEach(key => {
      const label = this.utilService.titleCase(key.split('_').join(' '));
      const lowercase_label = label.toLowerCase();
      const not_required_label = (lowercase_label.includes('updated') || lowercase_label.includes('created') || lowercase_label.includes('file') || lowercase_label.includes('id'))
      let type = "string"
      //check type of field
      if(lowercase_label.includes("date")) {
        type = "date"
      } else
       if(lowercase_label.includes("file")) {
        type = "file"
        files = JSON.parse(detail[key]);
      }

      if(!not_required_label) {
        this.documentModaLableValue.push({
          type ,label: label ,
          value: type == "file" ?  JSON.parse(detail[key])
          : type == "date" ?  moment(detail[key]).format('YYYY-MM-DD')
          : detail[key]
        })
      }
    });

    this.documentModaLableValue.push({type: 'file', label: 'FileNames', value: files})

    // this.service.document = detail;
    // if(this.selectedDocument == 'udyogAdhar') {
    //     this.router.navigateByUrl('document-doctor/udhyog-aadhar');
    // } if(this.selectedDocument == 'FoodLicience') {
    //   this.router.navigateByUrl('document-doctor/food-licience');
    // } if(this.selectedDocument == 'Gumasta') {
    //   this.router.navigateByUrl('document-doctor/gumasta');
    // } if(this.selectedDocument == 'GST') {
    //   this.router.navigateByUrl('document-doctor/gst');
    // }
  }

  open(file, i){
    // const id = 'iframe' + i;
    // const element = (<HTMLIFrameElement>document.getElementById(id))
    // element.src = file;
    // element.click();
    window.open(file,"_blank");
  }


  docSelected(event, selectedDoc) {
    if(event) {
      this.selectedDocumentIds.push(selectedDoc.document_id);
    } else {
      this.selectedDocumentIds.splice(this.selectedDocumentIds.indexOf(selectedDoc.document_id), 1 );
    }
    console.log(this.selectedDocumentIds);
  }

  assignSelectedDocsToVendor() {
    let formData = new FormData();
    formData.append('vendor_id', this.selectedVendor.value);
    formData.append('requested_document_id', this.selectedDocumentIds.join(','));
    // console.log(this.selectedVendor.value)
    this.accountService.assigneDocumentsToVendor(formData)
      .subscribe( () => {
          $('#assign_vendor').modal('hide');
          this.reload();
      })
  }

  updateStatus(doc, status){
    let document_id = doc.document_id;
    let document_name = this.selectedDocument;
    console.log("document_id" + document_id + '  ' + "document_name" + document_name);

    let formData = new FormData();
    formData.append('form_name', document_name );
    formData.append('document_id', document_id);
    formData.append('status', status);

    // formData.forEach(value => {
    //   console.log(value);
    // })


    this.accountService.updateDocumentStatus(formData)
    .pipe(take(1))
    .subscribe( () => {
      this.reload();
    })
  }

  reload() {
    this.ngOnInit();
  }
}
