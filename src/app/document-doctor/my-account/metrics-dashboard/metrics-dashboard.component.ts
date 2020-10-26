import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

import { DocumentService } from 'src/app/service/document.service';
import { MyAccountService } from 'src/app/service/myaccount.service';
import * as constants from 'src/app/service/constants';
import { ChartService } from './chart-service';
import * as moment from 'moment';

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
  currentYear;
  ordersPerMonthChartData: any;

  constructor(private service: DocumentService,private myAccservice: MyAccountService, private auth: AuthService, public chart: ChartService) {
    const storedyear = sessionStorage.getItem('current_year')
    this.currentYear = storedyear ? storedyear : this.getLatestYear();

  }

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
        this.generateOrdersPerMonthChartData();

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
         backgroundColor: '#0B0633',
         borderColor: '#1E88E5',
         data
       }
     ]
   }

  }


  generateOrdersPerMonthChartData(){
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'];
    let data:any = {
      'Jan':0, 'Feb':0, 'Mar':0, 'Apr':0, 'May':0, 'Jun':0, 'Jul':0, 'Aug':0, 'Sep':0, 'Oct':0,'Nov':0,'Dec':0
    };
    this.allOrders.forEach(order => {
      const date = moment(order.created_at)
      const month = date.format('M');
      const year  = date.format('YYYY');
      console.log(date,month,year);

      if(year === this.currentYear) {
        switch (month) {
          case '1':
            data.Jan += 1
            break;
            case '2':
            data.Feb += 1
            break;
            case '3':
            data.Mar += 1
            break;
            case '4':
            data.Apr += 1
            break;
            case '5':
            data.May += 1
            break;
            case '6':
            data.Jun += 1
            break;
            case '7':
            data.Jul += 1
            break;
            case '8':
            data.Aug += 1
            break;
            case '9':
            data.Sep += 1
            break;
            case '10':
            data.Oct += 1
            break;
            case '11':
            data.Nov += 1
            break;
            case '12':
            data.Dec += 1
            break;
          default:
            break;
        }
      }
    });

    const current_month = new Date().getMonth();
    const label = labels.slice(current_month - 4,current_month+1);
    let dataset = [];
    label.forEach(l => {
      dataset.push(data[l]);
    });

    this.ordersPerMonthChartData = {
      labels: label,
      datasets: [
          {
              label: 'Orders',
              data: dataset,
              fill: false,
              borderColor: '#0B0633'
          }
      ]
  }
  }

  getLatestYear(){
    const current_year = new Date().getFullYear().toString();
    sessionStorage.setItem('current_year', current_year);
    return current_year
  }
}
