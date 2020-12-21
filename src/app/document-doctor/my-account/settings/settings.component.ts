import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { DocumentService } from 'src/app/service/document.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('form') form : NgForm
  imageUrl: string;
  imageFile: File;
  user_id: number;
  constructor(private auth: AuthService, private service: DocumentService, private dataService: DataService , private route: Router) { }

  ngOnInit(): void {
    this.auth.peekAuthentication()
    .pipe(take(1)).subscribe(auth => {
      if(auth && auth.isAuthenticated){
        this.user_id = auth.user.id
        this.dataService.getUserById(this.user_id)
        .pipe(take(1))
        .subscribe(userData => {
          const user = userData[0]['data']
          this.imageUrl = user['profile_photo'];

          setTimeout(() => {
            this.form.setValue({
              name: user['name'] ? user['name'] : '',
              email: user['email'] ? user['email'] : '',
              dob: user['dob'] ? new Date(user['dob']) : '',
              pin_code: user['pin_code'] ? user['pin_code'] : '',
              address: user['address'] ? user['address'] : '',
              mobile: user['mobile'] ? user['mobile'] : ''
            })
          }, 500);

        })
      }
    });

  }


  onFileSelect(event){
    this.imageFile = event.target.files[0];
  }

  getDate(value){
    const date = new Date(value)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

  save(form: NgForm){

    const birth_date_format = this.getDate(form.control.get('dob').value)
      // form.control.get('birth_date').setValue(birth_date_format)

    let formData = new FormData();
      formData.append("profile_photo", this.imageFile);
      formData.append('user_id', this.user_id.toString())
      formData.append('name', form.control.get('name').value)
      formData.append('email', form.control.get('email').value)
      formData.append('dob', birth_date_format)
      formData.append('pin_code', form.control.get('pin_code').value)
      formData.append('address', form.control.get('address').value)
      formData.append('mobile', form.control.get('mobile').value)

      this.saveForm(formData);
  }

  saveForm(payload) {
    // for (var key of payload.entries()) {
		// 	console.log(key[0] + ', ' + key[1])
		// }
    this.service.saveUserProfile(payload)
      .subscribe((response) => {
        // alert('Successfully Saved!')
        this.auth.userInfo.name = this.form.value['name'];
        this.auth.userInfo.email = this.form.value['email'];
        this.auth.userInfo.mobile = this.form.value['mobile'];
        sessionStorage.setItem('USER', JSON.stringify(this.auth.userInfo));
        this.dataService.refreshUserData();
        this.route.navigateByUrl('/document-doctor')
      })
  }


}
