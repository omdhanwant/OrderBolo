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
import { GumastaComponent } from './document-doctor/gumasta/gumasta.component';
import { GstComponent } from './document-doctor/gst/gst.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { OrderSuccessPageComponent } from './order-success-page/order-success-page.component';
import { PfComponent } from './document-doctor/pf/pf.component';
import { IecComponent } from './document-doctor/iec/iec.component';
import { IsoComponent } from './document-doctor/iso/iso.component';
import { DscComponent } from './document-doctor/dsc/dsc.component';
import { MetricsDashboardComponent } from './document-doctor/my-account/metrics-dashboard/metrics-dashboard.component';
import { NewHomeComponent } from './document-doctor/new-home/new-home.component';
import { PrivateCompanyRegistrationComponent } from './document-doctor/private-company-registration/private-company-registration.component';
import { LimittedLiabilityPartnersheepComponent } from './document-doctor/limitted-liability-partnersheep/limitted-liability-partnersheep.component';
import { OnePersonCompanyComponent } from './document-doctor/one-person-company/one-person-company.component';
import { NidhiCompanyRegistrationComponent } from './document-doctor/nidhi-company-registration/nidhi-company-registration.component';
import { TrademarkRegistrationComponent } from './document-doctor/trademark-registration/trademark-registration.component';
import { IncometaxReturnComponent } from './document-doctor/incometax-return/incometax-return.component';
import { PatnersheepDeedNotaryComponent } from './document-doctor/patnersheep-deed-notary/patnersheep-deed-notary.component';
import { PatnersheepDeedRegisteredComponent } from './document-doctor/patnersheep-deed-registered/patnersheep-deed-registered.component';
import { RentAgreementRegisteredComponent } from './document-doctor/rent-agreement-registered/rent-agreement-registered.component';
import { RentAgreementNotaryComponent } from './document-doctor/rent-agreement-notary/rent-agreement-notary.component';
import { SettingsComponent } from './document-doctor/my-account/settings/settings.component';


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
  // {
  //   path: 'login',
  //   data: { breadcrumb: 'Login' },
  //   component: LoginComponent,
  //   pathMatch: 'full'
  // },

  {
    path: 'category-details',
    data: { breadcrumb: 'category details' },
    component: CategoryDetailComponent,
    // canActivate: [AuthGuard]
  }, {
    path: 'blogs',
    data: { breadcrumb: 'category details' },
    children: [
      {
        path: '',
        component: BlogsComponent,
      },
      {
        path: 'blog/:id',
        component: BlogDetailComponent
      }
    ]
    // canActivate: [AuthGuard]
  },
  {
    path: 'order-success-page',
    component: OrderSuccessPageComponent
  },
  {
    path: 'document-doctor',
    data: { breadcrumb: 'Document Doctor' },
    children: [
      {
        path: '',
        component: NewHomeComponent,
        // canActivate: [AuthGuard],
        data: { breadcrumb: null },
      },
      {
        path: 'aadhar-card',
        data: { breadcrumb: 'Aadhar Card' },
        component: AadharCardComponent,

      },
      {
        path: 'gumasta',
        data: { breadcrumb: 'Gumasta' },
        component: GumastaComponent,

      },
      {
        path: 'gst',
        data: { breadcrumb: 'GST' },
        component: GstComponent,

      },
      {
        path: 'udhyog-aadhar',
        data: { breadcrumb: 'Udhyog Aadhar' },
        component: UdyogAadharComponent,

      },
      {
        path: 'ration-card',
        data: { breadcrumb: 'Ration Card' },
        component: RationCardComponent,

      },
      {
        path: 'gazette-certificate',
        data: { breadcrumb: 'Gazette Certificate' },
        component: GazetteCertificateComponent,

      },
      {
        path: 'caste-validity',
        data: { breadcrumb: 'Caste Validity' },
        component: CasteValidityComponent,

      },
      {
        path: 'pan-card',
        data: { breadcrumb: 'Pan Card' },
        component: PanCardComponent,

      },
      {
        path: 'food-licience',
        data: { breadcrumb: 'Food Licience' },
        component: FoodLicienceComponent,

      },
      {
        path: 'others',
        data: { breadcrumb: 'Others' },
        component: OthersComponent,

      },
      {
        path: 'police-verification',
        data: { breadcrumb: 'Police Verification' },
        component: PoliceVerificationComponent,

      },
      {
        path: 'pf-registration',
        data: { breadcrumb: 'PF Registration' },
        component: PfComponent,

      },
      {
        path: 'iec-registration',
        data: { breadcrumb: 'IEC Registration' },
        component: IecComponent,

      },
      {
        path: 'iso-registration',
        data: { breadcrumb: 'ISO Registration' },
        component: IsoComponent,

      },
      {
        path: 'dsc-application',
        data: { breadcrumb: 'DSC Application' },
        component: DscComponent,

      },
      {
        path: 'private-company-registration',
        data: { breadcrumb: 'Pvt. Ltd. Company Registration' },
        component: PrivateCompanyRegistrationComponent,

      },
      {
        path: 'limitted-liability-partnersheep',
        data: { breadcrumb: 'Fast LLP Registration ServicePvt. Ltd. Company Registration' },
        component: LimittedLiabilityPartnersheepComponent,

      },
      {
        path: 'one-person-company',
        data: { breadcrumb: 'One Person Company' },
        component: OnePersonCompanyComponent,

      },
      {
        path: 'nidhi-company-registration',
        data: { breadcrumb: 'NIDHI COMPANY REGISTRATION' },
        component: NidhiCompanyRegistrationComponent,

      },
      {
        path: 'trademark-registration',
        data: { breadcrumb: 'TRADE MARK REGISTRATION' },
        component: TrademarkRegistrationComponent,

      },
      {
        path: 'incometax-return',
        data: { breadcrumb: 'INCOME TAX RETURN' },
        component: IncometaxReturnComponent,

      },
      {
        path: 'patnersheep-deed-notary',
        data: { breadcrumb: 'PARTNERSHEEP DEED (NOTARY)' },
        component: PatnersheepDeedNotaryComponent,

      },
      {
        path: 'patnersheep-deed-registered',
        data: { breadcrumb: 'PARTNERSHEEP DEED (REGISTERED)' },
        component: PatnersheepDeedRegisteredComponent,

      },
      {
        path: 'rent-agreement-registered',
        data: { breadcrumb: 'RENT AGREEMENT (REGISTERED)' },
        component: RentAgreementRegisteredComponent,

      },
      {
        path: 'rent-agreement-notary',
        data: { breadcrumb: 'RENT AGREEMENT (NOTARY)' },
        component: RentAgreementNotaryComponent,

      },
    ]
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'metric-dashboard',
        component: MetricsDashboardComponent,
        canActivate: [AuthGuard]
      },
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
        canActivate: [AuthGuard,AdminGaurd]
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        canActivate: [AuthGuard,AdminGaurd]
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'order-checkout',
    component: OrderCheckoutComponent,
    canActivate: [AuthGuard]
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
