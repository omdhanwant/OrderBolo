import { Component, OnInit, ViewChild } from '@angular/core';
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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'udyog-aadhar',
  templateUrl: './udyog-aadhar.component.html',
  styleUrls: ['./udyog-aadhar.component.scss']
})
export class UdyogAadharComponent implements OnInit {
  @ViewChild('form', {static: false}) form: NgForm;
  myFiles: File[] = [];
  user_id: number;
  isVeiwMode: boolean = false;
  constructor(private service: DocumentService, private dataService: DataService, private route: Router, private auth: AuthService,private alert: AlertService) { }

  ngOnInit(): void {
    if(this.service.document) {
      this.isVeiwMode = true;
      // this.form.form.disable();
      const data = {
      'aadhar_card':this.service.document.aadhar_card,
      'name_of_owner':this.service.document.name_of_owner,
      'caste':this.service.document.caste,
      'gender':this.service.document.gender,
      'physically_hadicapped':this.service.document.physically_hadicapped,
      'name_of_enterprises':this.service.document.name_of_enterprises,
      'company_pan_number':this.service.document.company_pan_number,
      'starting_business_date':this.service.document.starting_business_date,
      'gst_number':this.service.document.gst_number,
      'office_address':this.service.document.office_address,
      'location_of_plant':this.service.document.location_of_plant,
      'email':this.service.document.email,
      'mobile':this.service.document.mobile,
      'bank_name':this.service.document.bank_name,
      'bank_account_number':this.service.document.bank_account_number,
      'bank_ifsc':this.service.document.bank_ifsc,
      'main_business_activity_of_enterprises':this.service.document.main_business_activity_of_enterprises,
      'business_additional_info':this.service.document.business_additional_info,
      'number_of_employee':this.service.document.number_of_employee,
      'investment_in_plant_machinery':this.service.document.investment_in_plant_machinery,
      'turnover':this.service.document.turnover,
      'pan_card':this.service.document.pan_card
      }


      setTimeout(() => {
        this.form.setValue(data);
        this.form.form.disable();
      },1000);


    } else {
      this.auth.peekAuthentication()
      .pipe(take(1)).subscribe(auth => {
        if (auth && auth.isAuthenticated) {
          this.user_id = auth.user.id
        }
      });
    }

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
          name: payload.get('name_of_owner').toString(),
          address: payload.get('office_address').toString(),
          city: null,
          state: null,
          pincode: null,
          mobile: payload.get('mobile').toString(),
          amount:environment.UDHYOG_HAR_DOC_COST
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
