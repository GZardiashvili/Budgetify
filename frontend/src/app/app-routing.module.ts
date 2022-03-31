import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {MainPageComponent} from "./features/main-page/main-page.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CategoriesComponent} from "./features/categories/categories.component";
import {SubscriptionsComponent} from "./features/subscriptions/subscriptions.component";
import {ObligatoryComponent} from "./features/obligatory/obligatory.component";
import {StatisticsComponent} from "./features/statistics/statistics.component";


const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent,
}, {
  path: 'register',
  component: RegisterComponent,
}, {
  path: 'home',
  component: MainPageComponent,
  canActivate: [AuthGuard],
},
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'obligatory',
    component: ObligatoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
