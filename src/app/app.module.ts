import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//ngx bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';

//ng prime
import {DropdownModule} from 'primeng/dropdown';

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
    ViewDetailComponent
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
    SlickCarouselModule,
    NgOtpInputModule,


    //material
    // MatSelectModule,
    // MatCheckboxModule,
    MatInputModule,
    // MatButtonModule,
    MatIconModule

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
