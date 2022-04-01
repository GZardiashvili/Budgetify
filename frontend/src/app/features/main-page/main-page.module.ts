import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from "./main-page.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: MainPageComponent}
    ])
  ]
})
export class MainPageModule {
}
