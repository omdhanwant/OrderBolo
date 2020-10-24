import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

import { DocumentService } from 'src/app/service/document.service';
import { MyAccountService } from 'src/app/service/myaccount.service';
import * as constants from 'src/app/service/constants';
import { ChartService } from './chart-service';

@Component({
  selector: 'app-metrics-dashboard',
  templateUrl: './metrics-dashboard.component.html',
  styleUrls: ['./metrics-dashboard.component.scss'],
  providers: [ChartService]
})
export class MetricsDashboardComponent implements OnInit {
  totalPayments
  totalOrders
  totalDocuments
  totalVendors

  alldocuments
  allOrders
  allUsers
  documentsMap: Map<string, any>

  reqPerDocChartData: any;

  constructor(private service: DocumentService,private myAccservice: MyAccountService, private auth: AuthService, public chart: ChartService) { }

  initData(){
    this.documentsMap = new Map();
    this.reqPerDocChartData = [];
    this.alldocuments =[];
    this.allOrders =[];
    this.allUsers=[];
  }
  ngOnInit(): void {
    this.initData();
    const documents$ = this.service.getRequstedDouments(this.auth.userInfo.id).toPromise();
    const orders$ = this.myAccservice.getAllOrders().toPromise();
    const users$ = this.myAccservice.getAllUsers().toPromise();

    Promise.all([documents$,orders$,users$])
      .then(response => {
        this.alldocuments = response[0][0];
        this.allOrders = response[1];
        this.allUsers = response[2] // for admin

        this.sanitizeDocumentsData();
        this.calculateTotalMetrics();
        this.generateReqPerDocChartData();

      })
      .catch(error => {
        throw error;
      })
  }

  calculateTotalMetrics() {
    this.totalDocuments = Array.from( this.documentsMap.values()).map( docs => docs.length ).reduce((a,b) => a+b);
    this.totalOrders = this.allOrders.length;
    this.totalPayments  = this.allOrders.map(o => o.amount ).reduce((a,b) => a+b );
    this.totalVendors = this.allUsers.filter(u => u.user_type == constants.VENDOR ).length;
  }

  // get types of docuents
  sanitizeDocumentsData(){
    const documentNames: any[] = Array.from(Object.keys(this.alldocuments));
    documentNames.forEach(doc => {
      this.documentsMap.set(doc ,this.alldocuments[doc]);
    });
  }



  generateReqPerDocChartData(){
    //
    let data = [];
    let labels = [];
   for (let key of this.documentsMap.keys()){
     labels.push(key);
      data.push(this.documentsMap.get(key).length)
   }
   this.reqPerDocChartData = {
     labels,
     datasets: [
       {
         label: 'Documents',
         backgroundColor: '#a3aed9',
         borderColor: '#1E88E5',
         data
       }
     ]
   }
   console.log(this.reqPerDocChartData)
  }

}
