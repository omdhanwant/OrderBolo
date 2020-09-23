import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { DataService } from 'src/app/service/data.service';
import { AlertService } from 'src/app/service/alertService';
declare var $;
@Component({
  selector: 'app-food-licience',
  templateUrl: './food-licience.component.html',
  styleUrls: ['./food-licience.component.scss']
})
export class FoodLicienceComponent implements OnInit {
  myFiles: File[] = [];
  user_id: number;
  message: string;
  nature_of_business: any;
  nature_of_business_list: any[];

  constructor(private service: DocumentService, private dataService: DataService, private route: Router, private auth: AuthService, private alert: AlertService) {
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
          name: null,
          address: null,
          city: null,
          state: null,
          pincode: null,
          mobile: null,
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
