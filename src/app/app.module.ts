import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// http services
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/http.interceptor';
import { HttpClientModule } from '@angular/common/http';

//ngx bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';

//ng prime
import {DropdownModule} from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
//components
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HomeComponent } from './document-doctor/home/home.component';
import { FoodLicienceComponent } from './document-doctor/food-licience/food-licience.component';
import { PoliceVerificationComponent } from './document-doctor/police-verification/police-verification.component';
import { FooterComponent } from './footer/footer.component';
import { AadharCardComponent } from './document-doctor/aadhar-card/aadhar-card.component';
import { RationCardComponent } from './document-doctor/ration-card/ration-card.component';
import { CasteValidityComponent } from './document-doctor/caste-validity/caste-validity.component';
import { PanCardComponent } from './document-doctor/pan-card/pan-card.component';
import { GazetteCertificateComponent } from './document-doctor/gazette-certificate/gazette-certificate.component';
import { OthersComponent } from './document-doctor/others/others.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ViewDetailComponent } from './category-detail/view-detail/view-detail.component';
import { NgOtpInputModule } from  'ng-otp-input';

// // material
// import {MatSelectModule} from '@angular/material/select';
// import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
// import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { UtilService } from './service/util.service';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';
import { AlertService } from './service/alertService';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { BlogsComponent } from './blogs/blogs.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/authGaurd';
import { DocumentService } from './service/document.service';
import { UdyogAadharComponent } from './document-doctor/udyog-aadhar/udyog-aadhar.component';
import { AlertPopupComponent } from './common/alert-popup/alert-popup.component';
import { MyAccountComponent } from './document-doctor/my-account/my-account.component';
import { ProfileComponent } from './document-doctor/my-account/profile/profile.component';
import { RequestedDocumentsComponent } from './document-doctor/my-account/requested-documents/requested-documents.component';
import { BlogsSettingComponent } from './document-doctor/my-account/blogs-setting/blogs-setting.component';
import { ManageUsersComponent } from './document-doctor/my-account/manage-users/manage-users.component';
import { MyOrdersComponent } from './document-doctor/my-account/my-orders/my-orders.component';
import { AddBlogComponent } from './document-doctor/my-account/blogs-setting/add-blog/add-blog.component';
import { AddUserComponent } from './document-doctor/my-account/manage-users/add-user/add-user.component';
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';
import {ChipsModule} from 'primeng/chips';
// import {DialogModule} from 'primeng/dialog';
import { AdminGaurd } from './service/adminGaurd';
import { GumastaComponent } from './document-doctor/gumasta/gumasta.component';
import { GstComponent } from './document-doctor/gst/gst.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';
import { MyAccountService } from './service/myaccount.service';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { OrderSuccessPageComponent } from './order-success-page/order-success-page.component';

import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';
import { menu,placeholder, NgxEditorModule } from 'ngx-editor';
import { VendorRegistrationComponent } from './document-doctor/vendor-registration/vendor-registration.component';
import { ShowFormDetailsComponent } from './document-doctor/show-form-details/show-form-details.component';
import { FetchFileName } from './service/sanitize-file-name';
import { PfComponent } from './document-doctor/pf/pf.component';
import { IsoComponent } from './document-doctor/iso/iso.component';
import { IecComponent } from './document-doctor/iec/iec.component';
import { DscComponent } from './document-doctor/dsc/dsc.component';
import { MetricsDashboardComponent } from './document-doctor/my-account/metrics-dashboard/metrics-dashboard.component';

import {ChartModule} from 'primeng/chart';
import { NewHomeComponent } from './document-doctor/new-home/new-home.component';
import {CarouselModule as PrimeCarousal} from 'primeng/carousel';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    FoodLicienceComponent,
    PoliceVerificationComponent,
    FooterComponent,
    AadharCardComponent,
    RationCardComponent,
    CasteValidityComponent,
    PanCardComponent,
    GazetteCertificateComponent,
    OthersComponent,
    CategoryDetailComponent,
    ViewDetailComponent,
    BlogsComponent,
    LoginComponent,
    UdyogAadharComponent,
    AlertPopupComponent,
    MyAccountComponent,
    ProfileComponent,
    RequestedDocumentsComponent,
    BlogsSettingComponent,
    ManageUsersComponent,
    MyOrdersComponent,
    AddBlogComponent,
    AddUserComponent,
    MessageDialogComponent,
    GumastaComponent,
    GstComponent,
    OrderCheckoutComponent,
    BlogDetailComponent,
    OrderSuccessPageComponent,
    VendorRegistrationComponent,
    ShowFormDetailsComponent,
    FetchFileName,
    PfComponent,
    IsoComponent,
    IecComponent,
    DscComponent,
    MetricsDashboardComponent,
    NewHomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    DropdownModule,
    AutoCompleteModule,
    SlickCarouselModule,
    NgOtpInputModule,
    HttpClientModule,
    ToastModule,
    TabViewModule,
    NgxEditorModule.forRoot({
      plugins: [
        menu({
          // default options (Optional)
          toolbar: [
            ['bold', 'italic', 'code'], // inline icons
            ['ordered_list', 'bullet_list'],
            [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }] // dropdown
            // [codemirror] // custom menu, see https://sibiraj.dev/ngx-editor/additional-documentation/menu-plugin.html
          ],
          labels: {
            bold: 'Bold',
            italics: 'Italics',
            code: 'Code',
            ordered_list: 'Ordered List',
            bullet_list: 'Bullet List',
            heading: 'Heading'
          }
        }),
        placeholder('Type something here...')
      ],
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      fullScreenBackdrop: true,
      primaryColour: '#000',
      backdropBackgroundColour: 'rgba(172, 166, 166, 0.2)'
    }),
    ChipsModule,
    // DialogModule,
    PaginationModule.forRoot(),

    //material
    // MatSelectModule,
    // MatCheckboxModule,
    MatInputModule,
    // MatButtonModule,
    MatIconModule,
    ChartModule,
    PrimeCarousal

  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGaurd,
    AlertService,
    DataService,
    UtilService,
    DocumentService,
    MyAccountService,
    MessageService,
    FetchFileName,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
