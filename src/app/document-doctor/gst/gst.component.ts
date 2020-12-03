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
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.scss']
})
export class GstComponent implements OnInit {
  @ViewChild('form', {static: false}) form: NgForm;
  myFiles: File[] = [];
  user_id: number;
  message: string;
  isVeiwMode = false;
  constructor(private service: DocumentService, private dataService: DataService, private route: Router, private auth: AuthService, private _route: ActivatedRoute, private alert: AlertService) { }

  ngOnInit(): void {
    if(this.service.document) {
      this.isVeiwMode = true;
      // this.form.form.disable();
      const data = {
      'organization_name':this.service.document.organization_name,
      'applicant_name':this.service.document.applicant_name,
      'mobile':this.service.document.mobile,
      'aadhar_number':this.service.document.aadhar_number,
      'email':this.service.document.email,
      'pan_number':this.service.document.pan_number,
      'constitution_of_business':this.service.document.constitution_of_business,
      'electricity_bill':this.service.document.electricity_bill,
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
      formData.append('user_id', this.user_id.toString())
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('organization_name', form.control.get('organization_name').value)
      formData.append('applicant_name', form.control.get('applicant_name').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('aadhar_number', form.control.get('aadhar_number').value)
      formData.append('email', form.control.get('email').value)
      formData.append('pan_number', form.control.get('pan_number').value)
      formData.append('constitution_of_business', form.control.get('constitution_of_business').value)
      formData.append('electricity_bill', form.control.get('electricity_bill').value)
      this.saveForm(formData);
    } else  {
      this.showAlert('Please fill all the details');
    }

  }

  saveForm(payload) {
    for (var key of payload.entries()) {
      // console.log(key[0] + ', ' + key[1])
    }
    // this.service.saveGst(payload)
    //   .subscribe((response) => {
    //     this.route.navigateByUrl('/document-doctor')
    //   })
    this.service.saveGst(payload)
      .subscribe(() => {
        this.dataService.check_out_data = {
          user_id: +payload.get('user_id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id: '',
          name: payload.get('applicant_name').toString(),
          address: null,
          city: null,
          state: null,
          pincode: null,
          mobile: payload.get('mobile').toString(),
          amount:environment.GST_DOC_COST
        }

        this.route.navigateByUrl('/order-checkout')
      })
  }


  showAlert(message) {
    this.alert.addSingle('error','Alert',message);
  }
}
