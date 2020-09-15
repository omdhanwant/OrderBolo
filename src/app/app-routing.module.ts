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
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { BlogsComponent } from './blogs/blogs.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/authGaurd';
import { AdminGaurd } from './service/adminGaurd';
import { UdyogAadharComponent } from './document-doctor/udyog-aadhar/udyog-aadhar.component';
import { MyAccountComponent } from './document-doctor/my-account/my-account.component';
import { ProfileComponent } from './document-doctor/my-account/profile/profile.component';
import { RequestedDocumentsComponent } from './document-doctor/my-account/requested-documents/requested-documents.component';
import { BlogsSettingComponent } from './document-doctor/my-account/blogs-setting/blogs-setting.component';
import { ManageUsersComponent } from './document-doctor/my-account/manage-users/manage-users.component';
import { MyOrdersComponent } from './document-doctor/my-account/my-orders/my-orders.component';


// const routes: Routes = [];
const routes: Routes = [
  {
    path: '', redirectTo: '/document-doctor',
    data: { breadcrumb: 'Home' },
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: { breadcrumb: 'home' },
    component: DashboardComponent,
  },
  {
    path: 'login',
    data: { breadcrumb: 'Login' },
    component: LoginComponent,
    pathMatch: 'full'
  },

  {
    path: 'category-details',
    data: { breadcrumb: 'category details' },
    component: CategoryDetailComponent,
    // canActivate: [AuthGuard]
  }, {
    path: 'blogs',
    data: { breadcrumb: 'category details' },
    component: BlogsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'document-doctor',
    data: { breadcrumb: 'Document Doctor' },
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
        canActivate: [AuthGuard]
      },
      {
        path: 'udhyog-aadhar',
        data: { breadcrumb: 'Udhyog Aadhar' },
        component: UdyogAadharComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ration-card',
        data: { breadcrumb: 'Ration Card' },
        component: RationCardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'gazette-certificate',
        data: { breadcrumb: 'Gazette Certificate' },
        component: GazetteCertificateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'caste-validity',
        data: { breadcrumb: 'Caste Validity' },
        component: CasteValidityComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'pan-card',
        data: { breadcrumb: 'Pan Card' },
        component: PanCardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'food-licience',
        data: { breadcrumb: 'Food Licience' },
        component: FoodLicienceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'others',
        data: { breadcrumb: 'Others' },
        component: OthersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'police-verification',
        data: { breadcrumb: 'Police Verification' },
        component: PoliceVerificationComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuard,AdminGaurd],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'requested-documents',
        component: RequestedDocumentsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blogs-setting',
        component: BlogsSettingComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard]
      }
    ]
  },

  {
    path: '**', redirectTo: '/home', data: { breadcrumb: 'Home' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
