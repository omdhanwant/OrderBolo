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

@Component({
  selector: 'app-iso',
  templateUrl: './iso.component.html',
  styleUrls: ['./iso.component.scss']
})
export class IsoComponent implements OnInit {
  @ViewChild('form', {static: false}) form: NgForm;
  user_id: number;
  constructor(private service: DocumentService, private dataService: DataService, private route: Router, private auth: AuthService,private alert: AlertService) { }

  ngOnInit(): void {

    this.auth.peekAuthentication()
      .pipe(take(1)).subscribe(auth => {
        if (auth && auth.isAuthenticated) {
          this.user_id = auth.user.id
        }
      });

  }

  save(form: NgForm) {

    if(form.valid) {

      console.log(form.value);
      let formData = new FormData();

      formData.append('user_id', this.user_id.toString());
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('applicant_name', form.control.get('applicant_name').value);
      formData.append('email', form.control.get('email').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('address', form.control.get('address').value)
      formData.append('business_name', form.control.get('business_name').value)
      formData.append('business_address', form.control.get('business_address').value)
      formData.append('additional_detail_about_business', form.control.get('additional_detail_about_business').value)

      this.saveForm(formData);
    } else {
      this.showAlert('Please fill all details');
    }
  }

  saveForm(payload) {

    this.service.saveISODocument(payload)
      .subscribe(() => {

        this.dataService.check_out_data = {
          user_id: +payload.get('user_id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id: '',
          name: payload.get('applicant_name').toString(),
          address: payload.get('address').toString(),
          city: null,
          state: null,
          pincode: null,
          mobile: payload.get('mobile').toString(),
          amount:environment.ISO_DOC_COST
        }

        this.route.navigateByUrl('/order-checkout')
      })
  }

  showAlert(message) {
    this.alert.addSingle('error','Alert',message);
  }

}
