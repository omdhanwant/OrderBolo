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
    // const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    // return this.postData(`${environment.base_url}/v1/aadhar-add`, data,
    // {headers:headers} );
    return this.postData(`${environment.base_url}/v1/aadhar-add`, data);
  }
  saveFoodLicience(data){
    return this.postData(`${environment.base_url}/v1/food-licience-add`, data);
  }

  saveUdhyogAadharDocument(data){
    return this.postData(`${environment.base_url}/v1/udyog-adhar-add`, data)
  }
  saveGumasta(data){
    // const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    // return this.postData(`${environment.base_url}/v1/gumasta-add`, data,
    // {headers:headers} );
    return this.postData(`${environment.base_url}/v1/gumasta-add`, data)
  }
  saveGst(data){
    // const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    // return this.postData(`${environment.base_url}/v1/gumasta-add`, data,
    // {headers:headers} );
    return this.postData(`${environment.base_url}/v1/gst-add`, data)
  }

  savePoliceVerificationDocument(data){
    return this.postData(`${environment.base_url}/v1/police-verification-add`, data)
  }

  saveUserProfile(data){
    return this.postData(`${environment.base_url}/v1/updateUser`, data)
  }
  saveBlog(data){
    return this.postData(`${environment.base_url}/v1/blog`, data)
  }

  getRequstedDouments(user_id){
    return this.getData(`${environment.base_url}/v1/suggested-documents/${user_id}`)
  }
}
