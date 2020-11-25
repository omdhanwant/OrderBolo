import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


// const routes: Routes = [];
const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard',
    data: { breadcrumb: 'Dashboard' },
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    data: { breadcrumb: 'Dashboard' },
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
    path: '**', redirectTo: '/dashboard', data: { breadcrumb: 'Dashboard' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
