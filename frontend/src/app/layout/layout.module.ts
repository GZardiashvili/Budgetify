import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PiggyBankComponent } from '../features/piggy-bank/piggy-bank.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountsComponent } from './components/sidebar/accounts/accounts.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, PiggyBankComponent, LayoutComponent, AccountsComponent, SearchComponent],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SharedModule,
    LayoutRoutingModule,
    MatMenuModule,
    FontAwesomeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
  ],
})
export class LayoutModule {
}
