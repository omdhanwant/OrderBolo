import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-gumasta',
  templateUrl: './gumasta.component.html',
  styleUrls: ['./gumasta.component.scss']
})
export class GumastaComponent implements OnInit {
  myFiles:File [] = [];
  user_id:number;
  constructor(private service: DocumentService, private route: Router, private auth: AuthService) { }

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
    let formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("filenames[]", this.myFiles[i]);
    }

      const birth_date_format = this.getDate(form.control.get('birth_date').value)
      form.control.get('birth_date').setValue(birth_date_format)

      formData.append('user_id', this.user_id.toString())
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
  }

  saveForm(payload){
    for (var key of payload.entries()) {
			// console.log(key[0] + ', ' + key[1])
		}
    this.service.saveGumasta(payload)
      .subscribe((response) => {
        console.log(response);
        this.route.navigateByUrl('/document-doctor')
      })
  }

  getDate(value){
    const date = new Date(value)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

}
