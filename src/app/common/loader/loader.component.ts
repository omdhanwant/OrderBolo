import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  constructor(public utilService: UtilService) { }

  ngOnInit(): void {
  }

}
