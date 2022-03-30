import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {MainPageComponent} from "./layout/main-page/main-page.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
}, {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'home',
  component: MainPageComponent,
  canActivate: [AuthGuard],
},
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
