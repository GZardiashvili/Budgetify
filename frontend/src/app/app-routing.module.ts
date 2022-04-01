import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
}, {
  path: 'register',
  component: RegisterComponent,
}, {
  path: '',
  component: LayoutComponent,
  loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  canActivate: [AuthGuard],
}, {
  path: '**',
  redirectTo: '',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
