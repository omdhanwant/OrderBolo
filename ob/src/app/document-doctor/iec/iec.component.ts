import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { AlertService } from 'src/app/service/alertService';
import { take } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-iec',
  templateUrl: './iec.component.html',
  styleUrls: ['./iec.component.scss']
})
export class IecComponent implements OnInit {
  @ViewChild('form', {static: false}) form: NgForm;
  myFiles: File[] = [];
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

  onFileChange(event) {
   this.myFiles = event.target.files;
  }


  save(form: NgForm) {

    if(form.valid) {
      if (!this.myFiles.length) {
        this.showAlert('Please upload documents!');
        return
      }

      let formData = new FormData();
      for (var i = 0; i < this.myFiles.length; i++) {
        formData.append("filename", this.myFiles[i]);
      }

      const birth_date_format = this.getDate(form.control.get('birth_date').value)
      form.control.get('birth_date').setValue(birth_date_format)

      console.log(form.value);

      formData.append('user_id', this.user_id.toString());
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('name_of_business_entity', form.control.get('name_of_business_entity').value);
      formData.append('constitution_of_business', form.control.get('constitution_of_business').value)
      formData.append('discription_of_business', form.control.get('discription_of_business').value)
      formData.append('business_activity', form.control.get('business_activity').value)
      formData.append('birth_date', form.control.get('birth_date').value)
      formData.append('address_line_1', form.control.get('address_line_1').value)
      formData.append('address_line_2', form.control.get('address_line_2').value)
      formData.append('city', form.control.get('city').value)
      formData.append('state', form.control.get('state').value)
      formData.append('pin_code', form.control.get('pin_code').value)
      formData.append('applicant_email', form.control.get('applicant_email').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('sez', form.control.get('sez').value)
      formData.append('pan_card', form.control.get('pan_card').value)
      this.saveForm(formData);
    } else {
      this.showAlert('Please fill all details');
    }
  }

  saveForm(payload) {

    this.service.saveIESDocument(payload)
      .subscribe((res) => {
        console.log(res);

        if(res['exception']) {
            this.alert.addSingle('error','Error Message','Unexpected error occured');
            return
        }

        this.dataService.check_out_data = {
          user_id: +payload.get('user_id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id: '',
          name: payload.get('name_of_business_entity').toString(),
          address: payload.get('address_line_1').toString() + ',' +payload.get('address_line_2').toString(),
          city: payload.get('city').toString(),
          state: payload.get('state').toString(),
          pincode: payload.get('pin_code').toString(),
          mobile: payload.get('mobile').toString(),
          amount:environment.IEC_DOC_COST
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
