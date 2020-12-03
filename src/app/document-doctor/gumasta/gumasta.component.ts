import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
import { WindowRefService } from 'src/app/rozorpay-service/window-ref.service';
import { v4 as uuid } from 'uuid';
import { UtilService } from 'src/app/service/util.service';
import { DataService } from 'src/app/service/data.service';
import { AlertService } from 'src/app/service/alertService';
import { environment } from 'src/environments/environment';
declare var $;
@Component({
  selector: 'app-gumasta',
  templateUrl: './gumasta.component.html',
  styleUrls: ['./gumasta.component.scss']
})
export class GumastaComponent implements OnInit {
  @ViewChild('form', {static: false}) form: NgForm;
  myFiles: File[] = [];
  user_id: number;
  isVeiwMode = false;
  constructor(private service: DocumentService, private dataService: DataService, private route: Router, private auth: AuthService, private _route: ActivatedRoute, private alert: AlertService) { }

  ngOnInit(): void {
    if(this.service.document) {
      this.isVeiwMode = true;
      // this.form.form.disable();
      const data = {
      'type_of_registration':this.service.document.type_of_registration,
      'applicant_name':this.service.document.applicant_name,
      'mobile':this.service.document.mobile,
      'birth_date':this.service.document.birth_date,
      'email':this.service.document.email,
      'name_of_business':this.service.document.name_of_business,
      'full_business_address':this.service.document.full_business_address,
      'district':this.service.document.district,
      'city':this.service.document.city,
      'pin_code':this.service.document.pin_code,
      'type_of_business':this.service.document.type_of_business,
      'ownership_of_premises':this.service.document.ownership_of_premises,
      'total_male_employee':this.service.document.total_male_employee,
      'total_female_employee':this.service.document.total_female_employee,
      'nature_of_business':this.service.document.nature_of_business,
      'pan_card':this.service.document.pan_card,
      'aadhar_number':this.service.document.aadhar_number
      }


      setTimeout(() => {
        this.form.setValue(data);
        this.form.form.disable();
      },1000);

    } else {
      // this.auth.peekAuthentication()
      // .pipe(take(1)).subscribe(auth => {
      //   if (auth && auth.isAuthenticated) {
      //     this.user_id = auth.user.id
      //   }
      // });
    }

    this.auth.peekAuthentication()
    .pipe().subscribe(auth => {
      if (auth && auth.isAuthenticated) {
        this.user_id = auth.user.id
      } else {
        this.route.navigate([], {
          relativeTo: this._route,
          queryParams: {
            returnUrl: this.route.url
          },
          // queryParamsHandling: 'preserve'
          // skipLocationChange: false
        });
      }
    });


  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }


  showAlert(message) {
    this.alert.addSingle('error','Alert',message);
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

      const birth_date_format = this.getDate(form.control.get('birth_date').value)
      form.control.get('birth_date').setValue(birth_date_format)

      formData.append('user_id', this.user_id.toString())
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('type_of_registration', form.control.get('type_of_registration').value)
      formData.append('applicant_name', form.control.get('applicant_name').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('birth_date', form.control.get('birth_date').value)
      formData.append('email', form.control.get('email').value)
      formData.append('name_of_business', form.control.get('name_of_business').value)
      formData.append('full_business_address', form.control.get('full_business_address').value)
      formData.append('district', form.control.get('district').value)
      formData.append('city', form.control.get('city').value)
      formData.append('pin_code', form.control.get('pin_code').value)
      formData.append('type_of_business', form.control.get('type_of_business').value)
      formData.append('ownership_of_premises', form.control.get('ownership_of_premises').value)
      formData.append('total_male_employee', form.control.get('total_male_employee').value)
      formData.append('total_female_employee', form.control.get('total_female_employee').value)
      formData.append('nature_of_business', form.control.get('nature_of_business').value)
      formData.append('pan_card', form.control.get('pan_card').value)
      formData.append('aadhar_number', form.control.get('aadhar_number').value)
      this.saveForm(formData);
    } else {
      this.showAlert('Please fill all the details');
    }
  }

  saveForm(payload) {
    for (var key of payload.entries()) {
      // console.log(key[0] + ', ' + key[1])
    }
    // this.service.saveGumasta(payload)
    //   .subscribe((response) => {
    //     console.log(response);
    //     this.route.navigateByUrl('/document-doctor')
    //   })
      this.service.saveGumasta(payload)
      .subscribe(() => {
        // this.showAlert('Form Successfully Saved');
        this.dataService.check_out_data = {
          user_id: +payload.get('user_id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id:  '',
          name:  payload.get('applicant_name').toString(),
          address: payload.get('full_business_address').toString() ,
          city:  payload.get('city').toString() ,
          state:  null,
          pincode:  payload.get('pin_code').toString() ,
          mobile:   payload.get('mobile').toString() ,
          amount:environment.GUMASTA_DOC_COST
        }

        this.route.navigateByUrl('/order-checkout')
      })
  }

  getDate(value) {
    const date = new Date(value)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

}
