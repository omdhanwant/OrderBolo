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
  selector: 'app-dsc',
  templateUrl: './dsc.component.html',
  styleUrls: ['./dsc.component.scss']
})
export class DscComponent implements OnInit {
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
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    console.log(this.myFiles);
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
      console.log(this.myFiles);

      formData.append('user_id', this.user_id.toString());
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('usage_type', form.control.get('usage_type').value);
      formData.append('class_type', form.control.get('class_type').value)
      formData.append('user_type', form.control.get('user_type').value)
      formData.append('certificate_type', form.control.get('certificate_type').value)
      formData.append('certificate_validity', form.control.get('certificate_validity').value)
      formData.append('applicant_name', form.control.get('applicant_name').value)
      formData.append('applicant_email', form.control.get('applicant_email').value)
      formData.append('gender', form.control.get('gender').value)
      formData.append('birth_date', form.control.get('birth_date').value)
      formData.append('pan_card', form.control.get('pan_card').value)
      formData.append('address', form.control.get('address').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('nationality', form.control.get('nationality').value)
      formData.append('postal_code', form.control.get('postal_code').value)
      formData.append('state', form.control.get('state').value)
      formData.append('country', form.control.get('country').value)
      formData.append('aadhar_card', form.control.get('aadhar_card').value)
      this.saveForm(formData);
    } else {
      this.showAlert('Please fill all details');
    }
  }

  saveForm(payload) {


    this.service.saveDSCDocument(payload)
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
          name: payload.get('applicant_name').toString(),
          address: payload.get('address').toString(),
          city: payload.get('country').toString(),
          state: payload.get('state').toString(),
          pincode: payload.get('postal_code').toString(),
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
