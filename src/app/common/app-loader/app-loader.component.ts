import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss']
})
export class AppLoaderComponent {

  constructor(public utilservice: UtilService) { }
}
