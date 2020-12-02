import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { DataService } from 'src/app/service/data.service';
import { AlertService } from 'src/app/service/alertService';
import { environment } from 'src/environments/environment';
declare var $;
@Component({
  selector: 'app-patnersheep-deed-notary',
  templateUrl: './patnersheep-deed-notary.component.html',
  styleUrls: ['./patnersheep-deed-notary.component.scss']
})
export class PatnersheepDeedNotaryComponent implements OnInit {

  @ViewChild('form', {static: false}) form: NgForm;
  myFiles: File[] = [];
  user_id: number;
  message: string;
  isVeiwMode = false;

  constructor(private service: DocumentService, private dataService: DataService, private route: Router, private auth: AuthService, private alert: AlertService) {
   
  }

  ngOnInit(): void {

    if(this.service.document) {
      this.isVeiwMode = true;
      // this.form.form.disable();
      const data = {
      'applicant_name':this.service.document.applicant_name,
      'mobile':this.service.document.mobile,
      'email':this.service.document.email,
      'state':this.service.document.state,
      }


      setTimeout(() => {
        this.form.setValue(data);
        this.form.form.disable();
      },1000);

    } else {

    }

    this.auth.peekAuthentication()
      .pipe(take(1)).subscribe(auth => {
        if (auth && auth.isAuthenticated) {
          this.user_id = auth.user.id
        }
      });
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  save(form: NgForm) {
    if(form.valid) {
      if (!this.myFiles.length) {
        this.showAlert('Please upload documents!');
        return
      }

      let formData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("filenames[]", this.myFiles[i]);
      }
      // const birth_date_format = this.getDate(form.control.get('birth_date').value)
      // form.control.get('birth_date').setValue(birth_date_format)

      formData.append('id', this.user_id.toString())
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('applicant_name', form.control.get('applicant_name').value)
      formData.append('email', form.control.get('email').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('state', form.control.get('state').value)
      this.saveForm(formData);
    } else {
      this.showAlert('Please fill all the details');
    }

  }

  saveForm(payload) {
    this.service.savePartnershippdeednotaray(payload)
      .subscribe(() => {
        this.dataService.check_out_data = {
          user_id: +payload.get('id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id: '',
          name: payload.get('applicant_name').toString(),
          address: payload.get('state').toString(),
          city: payload.get('state').toString(),
          state: payload.get('state').toString(),
          pincode: payload.get('state').toString(),
          mobile: payload.get('mobile').toString(),
          amount: environment.PARTNERSHIP_DEED_NOTARY
        }

        this.route.navigateByUrl('/order-checkout')
      })
  }
  getDate(value) {
    const date = new Date(value)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }


  showAlert(message) {
    this.alert.addSingle('error','Alert',message);
  }
}
