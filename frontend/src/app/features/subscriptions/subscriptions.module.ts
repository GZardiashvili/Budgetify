import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from './subscriptions.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SubscriptionsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', pathMatch: 'full', component: SubscriptionsComponent},
        ]),
        SharedModule,
    ],
})
export class SubscriptionsModule {}
