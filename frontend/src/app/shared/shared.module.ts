import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "../auth/auth.module";
import {FeaturesModule} from "../features/features.module";
import {LoginComponent} from "../auth/login/login.component";
import {RegisterComponent} from "../register/register.component";
import {RouterModule} from "@angular/router";
import {LayoutModule} from "../layout/layout.module";
import {NotFoundComponent} from "../not-found/not-found.component";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, NotFoundComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    FeaturesModule,
    RouterModule,
    LayoutModule,
  ],
  exports: [
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FeaturesModule,
    LayoutModule,
  ]
})
export class SharedModule {

}