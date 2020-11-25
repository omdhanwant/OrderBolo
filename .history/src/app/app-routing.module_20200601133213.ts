import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './document-doctor/home/home.component';
import { FoodLicienceComponent } from './document-doctor/food-licience/food-licience.component';
import { PoliceVerificationComponent } from './document-doctor/police-verification/police-verification.component';
import { AadharCardComponent } from './document-doctor/aadhar-card/aadhar-card.component';
import { GazetteCertificateComponent } from './document-doctor/gazette-certificate/gazette-certificate.component';
import { PanCardComponent } from './document-doctor/pan-card/pan-card.component';
import { CasteValidityComponent } from './document-doctor/caste-validity/caste-validity.component';
import { RationCardComponent } from './document-doctor/ration-card/ration-card.component';
import { OthersComponent } from './document-doctor/others/others.component';


// const routes: Routes = [];
const routes: Routes = [
  {
    path: '', redirectTo: '/home',
    data: { breadcrumb: 'Home' },
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: { breadcrumb: 'home' },
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'document-doctor',
    data: { breadcrumb: 'Product' },
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: null },
      },
      {
        path: 'aadhar-card',
        data: { breadcrumb: 'Aadhar Card' },
        component: AadharCardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'ration-card',
        data: { breadcrumb: 'Ration Card' },
        component: RationCardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'gazette-certificate',
        data: { breadcrumb: 'Gazette Certificate' },
        component: GazetteCertificateComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'caste-validity',
        data: { breadcrumb: 'Caste Validity' },
        component: CasteValidityComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'pan-card',
        data: { breadcrumb: 'Pan Card' },
        component: PanCardComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'food-licience',
        data: { breadcrumb: 'Food Licience' },
        component: FoodLicienceComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'others',
        data: { breadcrumb: 'Others' },
        component: OthersComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'police-verification',
        data: { breadcrumb: 'Police Verification' },
        component: PoliceVerificationComponent,
        // canActivate: [AuthGuard]
      },
    ]
  },

  {
    path: '**', redirectTo: '/Home', data: { breadcrumb: 'Home' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
