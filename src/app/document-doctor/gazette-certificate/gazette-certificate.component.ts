import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GazetteCertificate } from 'src/app/models/documents';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-gazette-certificate',
  templateUrl: './gazette-certificate.component.html',
  styleUrls: ['./gazette-certificate.component.scss']
})
export class GazetteCertificateComponent implements OnInit {
  formData: GazetteCertificate
  user_id:number;
  myFiles: File[] = [];
  constructor(private service: DocumentService, private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.peekAuthentication()
    .pipe(take(1)).subscribe(auth => {
      if(auth && auth.isAuthenticated){
        this.user_id = auth.user.id
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

      const date = new Date(form.control.get('birth_date').value)
      const birth_date_format = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      form.control.get('birth_date').setValue(birth_date_format)

      formData.append('user_id', this.user_id.toString())
      formData.append('old_name', form.control.get('old_name').value)
      formData.append('new_name', form.control.get('new_name').value)
      formData.append('birth_date', form.control.get('birth_date').value)
      formData.append('pin_code', form.control.get('pin_code').value)
      formData.append('address', form.control.get('address').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('reason_of_change_name', form.control.get('reason_of_change_name').value)
      this.saveForm(formData);
  }

  saveForm(payload) {
    this.service.saveGezetteDocument(payload)
      .subscribe(() => {
        alert('Successfully Saved!')
        this.route.navigateByUrl('/document-doctor')
      })
  }

}
