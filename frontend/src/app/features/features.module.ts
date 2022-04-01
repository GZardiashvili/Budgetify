import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesComponent} from './categories/categories.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {ObligatoryComponent} from './obligatory/obligatory.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {PiggyBankComponent} from './piggy-bank/piggy-bank.component';
import {StatisticsComponent} from './statistics/statistics.component';


@NgModule({
  declarations: [
    MainPageComponent,
    CategoriesComponent,
    SubscriptionsComponent,
    ObligatoryComponent,
    StatisticsComponent,
    PiggyBankComponent,
  ],
  exports: [
    MainPageComponent,
    CategoriesComponent,
    SubscriptionsComponent,
    ObligatoryComponent,
    StatisticsComponent,
    PiggyBankComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class FeaturesModule {
}
