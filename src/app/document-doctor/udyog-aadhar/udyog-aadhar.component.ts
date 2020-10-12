import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
import { WindowRefService } from 'src/app/rozorpay-service/window-ref.service';
import { v4 as uuid } from 'uuid';
import { UtilService } from 'src/app/service/util.service';
import { DataService } from 'src/app/service/data.service';
import { AlertService } from 'src/app/service/alertService';

@Component({
  selector: 'udyog-aadhar',
  templateUrl: './udyog-aadhar.component.html',
  styleUrls: ['./udyog-aadhar.component.scss']
})
export class UdyogAadharComponent implements OnInit {
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
        formData.append("filenames[]", this.myFiles[i]);
      }

      // const birth_date_format = this.getDate(form.control.get('opening_date').value)
      // form.control.get('opening_date').setValue(birth_date_format)

      formData.append('user_id', this.user_id.toString());
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('aadhar_card', form.control.get('aadhar_card').value);
      formData.append('name_of_owner', form.control.get('name_of_owner').value)
      formData.append('caste', form.control.get('caste').value)
      formData.append('gender', form.control.get('gender').value)
      formData.append('physically_hadicapped', form.control.get('physically_hadicapped').value)
      formData.append('name_of_enterprises', form.control.get('name_of_enterprises').value)
      formData.append('company_pan_number', form.control.get('company_pan_number').value)
      formData.append('starting_business_date', form.control.get('starting_business_date').value)
      formData.append('gst_number', form.control.get('gst_number').value)
      formData.append('office_address', form.control.get('office_address').value)
      formData.append('location_of_plant', form.control.get('location_of_plant').value)
      formData.append('email', form.control.get('email').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('bank_name', form.control.get('bank_name').value)
      formData.append('bank_account_number', form.control.get('bank_account_number').value)
      formData.append('bank_ifsc', form.control.get('bank_ifsc').value)
      formData.append('main_business_activity_of_enterprises', form.control.get('main_business_activity_of_enterprises').value)
      formData.append('business_additional_info', form.control.get('business_additional_info').value)
      formData.append('number_of_employee', form.control.get('number_of_employee').value)
      formData.append('investment_in_plant_machinery', form.control.get('investment_in_plant_machinery').value)
      formData.append('turnover', form.control.get('turnover').value)
      formData.append('pan_card', form.control.get('pan_card').value)
      this.saveForm(formData);
    } else {
      this.showAlert('Please fill all details');
    }
  }

  saveForm(payload) {

    this.service.saveUdhyogAadharDocument(payload)
      .subscribe(() => {
        // this.showAlert('Form Successfully Saved');
        this.dataService.check_out_data = {
          user_id: +payload.get('user_id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id: '',
          name: null,
          address: null,
          city: null,
          state: null,
          pincode: null,
          mobile: null,
          amount:999
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
