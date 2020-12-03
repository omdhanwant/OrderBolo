import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { DataService } from 'src/app/service/data.service';
import { AlertService } from 'src/app/service/alertService';
import { environment } from 'src/environments/environment';
declare var $;
@Component({
  selector: 'app-one-person-company',
  templateUrl: './one-person-company.component.html',
  styleUrls: ['./one-person-company.component.scss']
})
export class OnePersonCompanyComponent implements OnInit {
  @ViewChild('form', {static: false}) form: NgForm;
  myFiles: File[] = [];
  user_id: number;
  message: string;
  nature_of_business: any;
  nature_of_business_list: any[];
  isVeiwMode = false;

  constructor(private service: DocumentService, private dataService: DataService, private route: Router, private auth: AuthService, private _route: ActivatedRoute, private alert: AlertService) {
    this.nature_of_business_list = [
      { label: 'Manufacturer', value: 'Manufacturer' },
      { label: 'hotel', value: 'hotel' },
      { label: 'restaurant', value: 'restaurant' },
      { label: 'club/canteen', value: 'club/canteen' },
      { label: 'Dhaba, Boarding house, home canteen/dabba wala, food stalls etc', value: 'Dhaba, Boarding house, home canteen/dabba wala, food stalls etc' },
      { label: 'Hawker (Itinerant/mobile food vendor)', value: 'Hawker (Itinerant/mobile food vendor)' },
      { label: 'petty retailer of snacks/tea shops', value: 'petty retailer of snacks/tea shops' },
      { label: 'wholesaler of foods', value: 'wholesaler of foods' },
      { label: 'retailers of food items', value: 'retailers of food items' },
      { label: 'distributor of food items', value: 'distributor of food items' },
      { label: 'supper of food items', value: 'supper of food items' },
      { label: 'caterer', value: 'caterer' },
      { label: 'food vending agencies', value: 'food vending agencies' },
      { label: 'transporter of food items', value: 'transporter of food items' },
      { label: 'marketer of food items', value: 'marketer of food items' },
      { label: 'storage (cold/refrigerated)', value: 'storage (cold/refrigerated)' },
      { label: 'storage (controlled atmosphere + cold)', value: 'storage (controlled atmosphere + cold)' },
      { label: 'storage (except controlled atmosphere and cold)', value: 'storage (except controlled atmosphere and cold)' },
      { label: 'others', value: 'others' },
    ]
  }

  ngOnInit(): void {

    if(this.service.document) {
      this.isVeiwMode = true;
      // this.form.form.disable();
      const data = {
      'full_name':this.service.document.full_name,
      'business_address':this.service.document.business_address,
      'mobile':this.service.document.mobile,
      'business_turn_over':this.service.document.business_turn_over,
      'email':this.service.document.email,
      'nature_of_business':this.service.document.nature_of_business,
      'business_name':this.service.document.business_name,
      'village_or_city':this.service.document.village_or_city,
      'nearest_railway_station':this.service.document.nearest_railway_station,
      'state':this.service.document.state,
      'pin_code':this.service.document.pin_code,
      'landmark':this.service.document.landmark,
      }


      setTimeout(() => {
        this.form.setValue(data);
        this.form.form.disable();
      },1000);

    } else {

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
      // const birth_date_format = this.getDate(form.control.get('birth_date').value)
      // form.control.get('birth_date').setValue(birth_date_format)

      formData.append('user_id', this.user_id.toString())
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('full_name', form.control.get('full_name').value)
      formData.append('email', form.control.get('email').value)
      formData.append('business_address', form.control.get('business_address').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('business_turn_over', form.control.get('business_turn_over').value)
      formData.append('nature_of_business', this.nature_of_business)
      formData.append('business_name', form.control.get('business_name').value)
      formData.append('village_or_city', form.control.get('village_or_city').value)
      formData.append('nearest_railway_station', form.control.get('nearest_railway_station').value)
      formData.append('state', form.control.get('state').value)
      formData.append('pin_code', form.control.get('pin_code').value)
      formData.append('landmark', form.control.get('landmark').value)
      this.saveForm(formData);
    } else {
      this.showAlert('Please fill all the details');
    }

  }

  saveForm(payload) {
    this.service.saveFoodLicience(payload)
      .subscribe(() => {
        this.dataService.check_out_data = {
          user_id: +payload.get('user_id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id: '',
          name: payload.get('full_name').toString(),
          address: payload.get('business_address').toString(),
          city: payload.get('village_or_city').toString(),
          state: payload.get('state').toString(),
          pincode: payload.get('pin_code').toString(),
          mobile: payload.get('mobile').toString(),
          amount: environment.FOOD_LIC_DOC_COST
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
