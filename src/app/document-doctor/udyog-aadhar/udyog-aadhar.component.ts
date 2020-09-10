import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'udyog-aadhar',
  templateUrl: './udyog-aadhar.component.html',
  styleUrls: ['./udyog-aadhar.component.scss']
})
export class UdyogAadharComponent implements OnInit {
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
    console.log(this.myFiles);
  }


  save(form: NgForm){
    let formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("filenames[]", this.myFiles[i]);
    }

      const birth_date_format = this.getDate(form.control.get('opening_date').value)
      form.control.get('opening_date').setValue(birth_date_format)

      formData.append('user_id', this.user_id.toString())
      formData.append('name_of_shop', form.control.get('name_of_shop').value)
      formData.append('opening_date', form.control.get('opening_date').value)
      formData.append('pin_code', form.control.get('pin_code').value)
      formData.append('pan_card', form.control.get('pan_card').value)
      formData.append('address', form.control.get('address').value)
      formData.append('name_of_owner', form.control.get('name_of_owner').value)
      formData.append('nature_of_business', form.control.get('nature_of_business').value)
      formData.append('how_many_workers', form.control.get('how_many_workers').value)
      formData.append('aadhar_card', form.control.get('aadhar_card').value)
      formData.append('mobile', form.control.get('mobile').value)
      formData.append('email', form.control.get('email').value)
      this.saveForm(formData);
  }

  saveForm(payload){
    // for (var key of payload.entries()) {
		// 	console.log(key[0] + ', ' + key[1])
		// }
    this.service.saveUdhyogAadharDocument(payload)
      .subscribe((response) => {
        console.log(response)
        alert('Successfully Saved!')
        this.route.navigateByUrl('/document-doctor')
      })
  }

  getDate(value){
    const date = new Date(value)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }


}
