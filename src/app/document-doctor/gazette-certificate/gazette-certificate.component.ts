import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GazetteCertificate } from 'src/app/models/documents';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gazette-certificate',
  templateUrl: './gazette-certificate.component.html',
  styleUrls: ['./gazette-certificate.component.scss']
})
export class GazetteCertificateComponent implements OnInit {
  formData: GazetteCertificate
  constructor(private service: DocumentService, private route: Router) { }

  ngOnInit(): void {
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
    this.service.saveGezetteDocument(data)
      .subscribe(() => {
        alert('Successfully Saved!')
        this.route.navigateByUrl('/document-doctor')
      })
  }

}
