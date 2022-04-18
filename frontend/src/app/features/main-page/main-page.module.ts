import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction/transaction.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [MainPageComponent, TransactionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: MainPageComponent},
    ]),
    MatCardModule,
    FontAwesomeModule,
    SharedModule,
    MatSidenavModule,
  ],
})
export class MainPageModule {
}
