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
@Component({
  selector: 'app-pf',
  templateUrl: './pf.component.html',
  styleUrls: ['./pf.component.scss']
})
export class PfComponent implements OnInit {
  @ViewChild('form', {static: false}) form: NgForm;
  user_id: number;
  // isVeiwMode: boolean = false;
  constructor(private service: DocumentService, private dataService: DataService, private route: Router, private _route: ActivatedRoute, private auth: AuthService,private alert: AlertService) { }

  ngOnInit(): void {

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



  save(form: NgForm) {

    if(form.valid) {
      console.log(form.value);

      let formData = new FormData();

      formData.append('user_id', this.user_id.toString());
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('applicant_name', form.control.get('applicant_name').value);
      formData.append('email', form.control.get('email').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('city', form.control.get('city').value)
      formData.append('state', form.control.get('state').value)
      formData.append('number_of_employees', form.control.get('number_of_employees').value)
      formData.append('your_payable_amount', form.control.get('your_payable_amount').value)
      formData.append('howDidYou', form.control.get('howDidYou').value)

      this.saveForm(formData);
    } else {
      this.showAlert('Please fill all details');
    }
  }

  saveForm(payload) {
    this.service.savePfDocument(payload)
      .subscribe(() => {
        // this.showAlert('Form Successfully Saved');
        this.dataService.check_out_data = {
          user_id: +payload.get('user_id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id: '',
          name: payload.get('applicant_name').toString(),
          address: null,
          city: payload.get('city').toString(),
          state: payload.get('state').toString(),
          pincode: null,
          mobile: payload.get('mobile').toString(),
          amount:environment.PF_DOC_COST
        }

        this.route.navigateByUrl('/order-checkout')
      })
  }

  showAlert(message) {
    this.alert.addSingle('error','Alert',message);
  }

}
