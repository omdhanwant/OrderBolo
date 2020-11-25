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
  selector: 'app-aadhar-card',
  templateUrl: './aadhar-card.component.html',
  styleUrls: ['./aadhar-card.component.scss']
})
export class AadharCardComponent implements OnInit {
  myFiles:File [] = [];
  user_id:number;
  message: string;
  constructor(private service: DocumentService,private dataService: DataService, private route: Router, private auth: AuthService,private alert: AlertService) { }

  ngOnInit(): void {
    this.auth.peekAuthentication()
    .pipe(take(1)).subscribe(auth => {
      if(auth && auth.isAuthenticated){
        this.user_id = auth.user.id
      }
    });
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }


  save(form: NgForm){

    if(!this.myFiles.length) {
      this.showAlert('Please upload documents!');
      return
    }

    let formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("filenames[]", this.myFiles[i]);
    }
    // formData.append("filenames[]", []);

      const birth_date_format = this.getDate(form.control.get('birth_date').value)
      form.control.get('birth_date').setValue(birth_date_format)

      formData.append('user_id', this.user_id.toString())
      formData.append('document_id', uuid()) /// create a unique document id
      formData.append('full_name', form.control.get('full_name').value)
      formData.append('birth_date', form.control.get('birth_date').value)
      formData.append('pin_code', form.control.get('pin_code').value)
      formData.append('pan_card', form.control.get('pan_card').value)
      formData.append('full_address', form.control.get('full_address').value)
      formData.append('state', form.control.get('state').value)
      formData.append('city', form.control.get('city').value)
      // let payload = {user_id: this.user_id, filenames: this.myFiles, ...form.value}
      this.saveForm(formData);
  }

  saveForm(payload: FormData){
    this.service.saveAdharCardDocument(payload)
      .subscribe(() => {
        // this.showAlert('Form Successfully Saved');
        this.dataService.check_out_data = {
          user_id: +payload.get('user_id').toString(),
          document_id: payload.get('document_id').toString(),
          order_id:  '',
          name:  null,
          address: null ,
          city:  null,
          state:  null,
          pincode:  null,
          mobile:   null,
          amount:0
        }

        this.route.navigateByUrl('/order-checkout')
      })
  }

  getDate(value){
    const date = new Date(value)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }


  showAlert(message) {
    this.alert.addSingle('error','Alert',message);
  }
}
