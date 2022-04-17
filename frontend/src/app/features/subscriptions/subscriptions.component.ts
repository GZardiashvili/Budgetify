import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionService } from './services/subscription.service';
import { Observable, Subject } from 'rxjs';
import { Subscriptions } from './subscriptions';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Transaction } from '../main-page/transaction/transaction';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  subscriptions$!: Observable<Subscriptions[]>;
  subscription$!: Observable<Subscriptions>;

  subscriptionForm: FormGroup = this.fb.group({
    title: [''],
    category: [''],
    description: [''],
    amount: [''],
  });

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private fb: FormBuilder
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

    this.subscription$.pipe(takeUntil(
        this.componentIsDestroyed$),
      tap(subscription => {
        this.subscriptionForm.patchValue(subscription)
      })).subscribe();
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

}
