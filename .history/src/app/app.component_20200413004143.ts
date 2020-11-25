import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FileTransfer';

  // file upload event
  fileEvent(event{
    console.log(event);
  }
}
