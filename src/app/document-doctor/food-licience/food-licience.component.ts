import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-food-licience',
  templateUrl: './food-licience.component.html',
  styleUrls: ['./food-licience.component.scss']
})
export class FoodLicienceComponent implements OnInit {
  myFiles:File [] = [];
  nature_of_business:any;
  nature_of_business_list: any[];
  // user_id:number;
  constructor(private service: DocumentService, private route: Router, private auth: AuthService) { 
    this.nature_of_business_list =[
      {label:'Manufacturer', value: 'Manufacturer'},
      {label:'hotel', value: 'hotel'},
      {label:'restaurant', value: 'restaurant'},
      {label:'club/canteen', value: 'club/canteen'},
      {label:'Dhaba, Boarding house, home canteen/dabba wala, food stalls etc', value: 'Dhaba, Boarding house, home canteen/dabba wala, food stalls etc'},
      {label:'Hawker (Itinerant/mobile food vendor)', value: 'Hawker (Itinerant/mobile food vendor)'},
      {label:'petty retailer of snacks/tea shops', value: 'petty retailer of snacks/tea shops'},
      {label:'wholesaler of foods', value: 'wholesaler of foods'},
      {label:'retailers of food items', value: 'retailers of food items'},
      {label:'distributor of food items', value: 'distributor of food items'},
      {label:'supper of food items', value: 'supper of food items'},
      {label:'caterer', value: 'caterer'},
      {label:'food vending agencies', value: 'food vending agencies'},
      {label:'transporter of food items', value: 'transporter of food items'},
      {label:'marketer of food items', value: 'marketer of food items'},
      {label:'storage (cold/refrigerated)', value: 'storage (cold/refrigerated)'},
      {label:'storage (controlled atmosphere + cold)', value: 'storage (controlled atmosphere + cold)'},
      {label:'storage (except controlled atmosphere and cold)', value: 'storage (except controlled atmosphere and cold)'},
      {label:'others', value: 'others'},
    ]
  }

  ngOnInit(): void {
    // this.auth.peekAuthentication()
    // .pipe(take(1)).subscribe(auth => {
    //   if(auth && auth.isAuthenticated){
    //     this.user_id = auth.user.id
    //   }
    // });
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    console.log(this.myFiles);

  }


  save(form: NgForm){
    // let formData = new FormData();
    // for (var i = 0; i < this.myFiles.length; i++) {
    //   formData.append("filenames[]", this.myFiles[i]);
    // }

    //   const birth_date_format = this.getDate(form.control.get('birth_date').value)
    //   form.control.get('birth_date').setValue(birth_date_format)

    //   formData.append('user_id', this.user_id.toString())
    //   formData.append('full_name', form.control.get('full_name').value)
    //   formData.append('birth_date', form.control.get('birth_date').value)
    //   formData.append('pin_code', form.control.get('pin_code').value)
    //   formData.append('pan_card', form.control.get('pan_card').value)
    //   formData.append('full_address', form.control.get('full_address').value)
    //   formData.append('state', form.control.get('state').value)
    //   formData.append('city', form.control.get('city').value)
    //   this.saveForm(formData);
  }

  saveForm(payload){
    // for (var key of payload.entries()) {
		// 	console.log(key[0] + ', ' + key[1])
		// }
    // this.service.saveAdharCardDocument(payload)
    //   .subscribe((response) => {
    //     console.log(response)
    //     alert('Successfully Saved!')
    //     this.route.navigateByUrl('/document-doctor')
    //   })
  }

  getDate(value){
    // const date = new Date(value)
    // return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

}
