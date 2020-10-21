import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class DocumentService extends DataService{

  private documentData: any;

  get document() {
    return this.documentData;
  }

  set document(data) {
    this.documentData = data;
  }

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

  addUser(user){
    return this.postData(`${environment.base_url}/v1/addUser`, user)
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

  savePfDocument(data){
    return this.postData(`${environment.base_url}/v1/pf`, data)
  }

  saveISODocument(data){
    return this.postData(`${environment.base_url}/v1/iso`, data)
  }

  saveIESDocument(data){
    return this.postData(`${environment.base_url}/v1/ies`, data)
  }

  saveDSCDocument(data){
    return this.postData(`${environment.base_url}/v1/dsc`, data)
  }
}
