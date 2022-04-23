import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: CategoriesComponent},
    ]),
    CommonModule,
    SharedModule,
  ],
})
export class CategoriesModule {
}
