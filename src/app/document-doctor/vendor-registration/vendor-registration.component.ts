import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/service/alertService';
import { DocumentService } from 'src/app/service/document.service';
declare var $;
@Component({
  selector: 'vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.scss']
})
export class VendorRegistrationComponent implements OnInit {

  constructor(private service: DocumentService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  save(form: NgForm){
    if(form.invalid) {
      this.alertService.addSingle('error','Error Message','Please enter all required details.');
      return
    }
    const birth_date_format = this.getDate(form.control.get('dob').value)
    // form.control.get('birth_date').setValue(birth_date_format)

    let formData = new FormData();
    // formData.append('user_id', this.user_id.toString())
    formData.append('name', form.control.get('name').value)
    formData.append('email', form.control.get('email').value)
    formData.append('dob', birth_date_format)
    formData.append('pin_code', form.control.get('pin_code').value)
    formData.append('address', form.control.get('address').value)
    formData.append('mobile', form.control.get('mobile').value)
    formData.append('user_type', 'vendor')

    this.saveForm(formData,form);
  }

  saveForm(payload,form:NgForm) {
    this.service.addUser(payload)
      .subscribe((response) => {
        form.reset();
        $('#vendor-register-modal').modal('hide');
      })
  }

  getDate(value){
    const date = new Date(value)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

  closeModal(form) {
    form.reset();
    $('#vendor-register-modal').modal('hide');
  }
}
