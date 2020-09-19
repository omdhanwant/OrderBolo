import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';
import { WindowRefService } from '../../rozorpay-service/window-ref.service';
@Component({
  selector: 'app-aadhar-card',
  templateUrl: './aadhar-card.component.html',
  styleUrls: ['./aadhar-card.component.scss'],
  providers: [WindowRefService]
})
export class AadharCardComponent implements OnInit {
  myFiles:File [] = [];
  // previewFiles:string[] = [];
  user_id:number;
  constructor(private winRef: WindowRefService, private service: DocumentService, private route: Router, private auth: AuthService) { }

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
    // console.log(this.previewFiles);

  }


  save(form: NgForm){
    let formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("filenames[]", this.myFiles[i]);
    }
    // formData.append("filenames[]", []);

      const birth_date_format = this.getDate(form.control.get('birth_date').value)
      form.control.get('birth_date').setValue(birth_date_format)

      formData.append('user_id', this.user_id.toString())
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

  saveForm(payload){
    for (var key of payload.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
    // let options = { content: payload };
    this.service.saveAdharCardDocument(payload)
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

  //razorpay payment gatway
  createRzpayOrder(data) {
    console.log(data);
    // call api to create order_id
    this.payWithRazor('123123');
  }
  payWithRazor(val) {
    const options: any = {
      key: 'rzp_test_p0HxOFqgEsmvhR',
      amount: 1200, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'vit solutions', // company name or product name
      description: '',  // product description
      image: './assets/logo.png', // company logo or product image
      order_id: '', // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
