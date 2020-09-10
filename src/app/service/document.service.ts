import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class DocumentService extends DataService{

  saveGezetteDocument(data) {
    return this.postData(`${environment.base_url}/v1/gezeette-add`, data)
  }

  saveAdharCardDocument(data){
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    return this.postData(`${environment.base_url}/v1/aadhar-add`, data,
    {headers:headers} )
  }

  saveUdhyogAadharDocument(data){
    return this.postData(`${environment.base_url}/v1/udyog-adhar-add`, data)
  }

  savePoliceVerificationDocument(data){
    return this.postData(`${environment.base_url}/v1/police-verification-add`, data)
  }
}
