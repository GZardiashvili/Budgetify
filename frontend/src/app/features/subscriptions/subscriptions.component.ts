import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from './services/subscription.service';
import { Observable } from 'rxjs';
import { Subscriptions } from './subscriptions';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Transaction } from '../main-page/transaction/transaction';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  subscriptions$!: Observable<Subscriptions[]>;
  subscription$!: Observable<Transaction>;

  subscriptionForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(''),
  });

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
          return this.subscriptionService.getSubscriptions(String(id));
        })
      );
  }

  getSubscription(id: string) {
    this.subscription$ = this.route.paramMap.pipe(
      switchMap(params => {
        const accountId = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
        return this.subscriptionService.getSubscription(String(accountId), String(id));
      })
    );

    this.subscription$.pipe(tap(subscription => {
      this.subscriptionForm.get('title')?.setValue(subscription.title);
      this.subscriptionForm.get('description')?.setValue(subscription.description);
      this.subscriptionForm.get('category')?.setValue(subscription.category);
      this.subscriptionForm.get('amount')?.setValue(subscription.amount);
    })).subscribe();
  }
}
