import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './document-doctor/home/home.component';
import { FoodLicienceComponent } from './document-doctor/food-licience/food-licience.component';
import { PoliceVerificationComponent } from './document-doctor/police-verification/police-verification.component';


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
        path: 'food-licience',
        data: { breadcrumb: 'Food Licience' },
        component: FoodLicienceComponent,
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
