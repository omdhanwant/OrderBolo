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
  constructor(private service: DocumentService, private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.peekAuthentication()
    .pipe(take(1)).subscribe(auth => {
      if(auth && auth.isAuthenticated){
        this.user_id = auth.user.id
      }
    });
  }

  save(form: NgForm){
    if(form.valid) {
      const date = new Date(form.control.get('birth_date').value)
      const birth_date_format = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      form.control.get('birth_date').setValue(birth_date_format)
      console.log(form.value);
      this.saveForm(form.value);
    } else {
      alert('Please enter all details');
    }

  }

  saveForm(data) {
    const payload = { user_id: this.user_id, ...data};
    console.log(payload);
    this.service.saveGezetteDocument(payload)
      .subscribe(() => {
        alert('Successfully Saved!')
        this.route.navigateByUrl('/document-doctor')
      })
  }

}
