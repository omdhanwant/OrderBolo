import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './document-doctor/home/home.component';
import { FoodLicienceComponent } from './document-doctor/food-licience/food-licience.component';


// const routes: Routes = [];
const routes: Routes = [
  {
    path: '', redirectTo: '/home',
    data: { breadcrumb: 'Home' },
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: { breadcrumb: 'Home' },
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
        path: 'document-doctor/',
        data: { breadcrumb: 'Food Licience' },

        component: FoodLicienceComponent,
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
  import { HomeComponent } from './document-doctor/home/home.component';
eximport { FoodLicienceComponent } from './document-doctor/food-licience/food-licience.component';
ports: [RouterModule]
})
export class AppRoutingModule { }
