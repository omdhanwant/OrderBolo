import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-police-verification',
  templateUrl: './police-verification.component.html',
  styleUrls: ['./police-verification.component.scss']
})
export class PoliceVerificationComponent implements OnInit {
  user_id:number;
  myFiles: File[] = [];
  constructor(private service: DocumentService, private route: Router, private _route: ActivatedRoute, private auth: AuthService) { }

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

  // save(form: NgForm){
  //   if(form.valid) {
  //     const date = new Date(form.control.get('birth_date').value)
  //     const birth_date_format = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  //     form.control.get('birth_date').setValue(birth_date_format)
  //     console.log(form.value);
  //     this.saveForm(form.value);
  //   } else {
  //     alert('Please enter all details');
  //   }

  // }
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

      formData.append('user_id', this.user_id.toString())
      formData.append('full_name', form.control.get('full_name').value)
      formData.append('employee_of_company', form.control.get('employee_of_company').value)
      formData.append('working_from_years', form.control.get('working_from_years').value)
      formData.append('pin_code', form.control.get('pin_code').value)
      formData.append('address', form.control.get('address').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('ref_name1', form.control.get('ref_name1').value)
      formData.append('ref_name2', form.control.get('ref_name2').value)
      formData.append('ref_address1', form.control.get('ref_address1').value)
      formData.append('ref_address2', form.control.get('ref_address2').value)
      formData.append('ref_mobile1', form.control.get('ref_mobile1').value)
      formData.append('ref_mobile2', form.control.get('ref_mobile2').value)
      this.saveForm(formData);
  }

  saveForm(payload) {
    for (var key of payload.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
    this.service.savePoliceVerificationDocument(payload)
      .subscribe((response) => {
        console.log(response);
        alert('Successfully Saved!')
        this.route.navigateByUrl('/document-doctor')
      })
  }

}
