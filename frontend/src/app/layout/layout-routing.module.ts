import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../auth/guards/auth.guard";
import {NotFoundComponent} from "../not-found/not-found.component";

const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: 'home',
  loadChildren: () => import('../features/main-page/main-page.module').then(m => m.MainPageModule),
}, {
  path: 'categories',
  loadChildren: () => import('../features/categories/categories.module').then(m => m.CategoriesModule),
},
  {
    path: 'subscriptions',
    loadChildren: () => import('../features/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'obligatory',
    loadChildren: () => import('../features/obligatory/obligatory.module').then(m => m.ObligatoryModule),
  },
  {
    path: 'statistics',
    loadChildren: () => import('../features/statistics/statistics.module').then(m => m.StatisticsModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
