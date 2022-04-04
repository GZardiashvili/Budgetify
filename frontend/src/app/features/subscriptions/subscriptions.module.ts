import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SubscriptionsComponent} from "./subscriptions.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: SubscriptionsComponent}
    ])
  ]
})
export class SubscriptionsModule {
}
