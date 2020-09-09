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
    return this.postData(`${environment.base_url}/v1/adhar-add`, data)
  }
}
