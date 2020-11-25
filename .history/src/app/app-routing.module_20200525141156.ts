import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


// const routes: Routes = [];
const routes: Routes = [
  {
    path: '', redirectTo: '/Home',
    data: { breadcrumb: 'Home' },
    pathMatch: 'full'
  },
  {
    path: 'Home',
    data: { breadcrumb: 'Home' },
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'product-v2',
  //   data: { breadcrumb: 'Product' },
  //   children: [
  //     {
  //       path: '',
  //       component: ItemComponent,
  //       canActivate: [AuthGuard],
  //       data: { breadcrumb: null },
  //     },
  //     {
  //       path: 'add-product-v2',
  //       data: { breadcrumb: 'View Product' },

  //       component: AddProductV2Component,
  //       canActivate: [AuthGuard]
  //     },
  //   ]
  // },

  {
    path: '**', redirectTo: '/Home', data: { breadcrumb: 'Home' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
