import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-aadhar-card',
  templateUrl: './aadhar-card.component.html',
  styleUrls: ['./aadhar-card.component.scss']
})
export class AadharCardComponent implements OnInit {
  myFiles:File [] = [];
  // previewFiles:string[] = [];
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

        // File Preview
        // const reader = new FileReader();
        // reader.onload = () => {
        //  this.previewFiles.push(reader.result as string);
        // }
        // reader.readAsDataURL(event.target.files[i]);
    }
    console.log(this.myFiles);
    // console.log(this.previewFiles);

  }


  save(form: NgForm){
    // const formData = new FormData();
    // for (var i = 0; i < this.myFiles.length; i++) {
    //   formData.append("filenames[]", this.myFiles[i]);
    // }
      const birth_date_format = this.getDate(form.control.get('birth_date').value)
      form.control.get('birth_date').setValue(birth_date_format)
      let payload = {user_id: this.user_id, filenames: this.myFiles, ...form.value}
      this.saveForm(payload);
  }

  saveForm(payload){
    console.log(payload);
    this.service.saveAdharCardDocument(payload)
      .subscribe(() => {
        alert('Successfully Saved!')
        this.route.navigateByUrl('/document-doctor')
      })
  }

  getDate(value){
    const date = new Date(value)
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  }

}
