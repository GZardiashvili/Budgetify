import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ObligatoryComponent } from './obligatory/obligatory.component';
import { StatisticComponent } from './statistic/statistic.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    SubscriptionsComponent,
    ObligatoryComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeaturesModule {
}
