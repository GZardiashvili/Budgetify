import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionService } from './services/subscription.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Subscriptions } from './subscriptions';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../../shared/common/common.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadSubscriptions$ = new BehaviorSubject(true);

  subscriptions$!: Observable<Subscriptions[]>;
  subscription!: Subscriptions | null;

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
    private fb: FormBuilder,
    private commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions$ = combineLatest([
      this.route.paramMap,
      this.commonService.getSearchTerm().pipe(
        takeUntil(this.componentIsDestroyed$),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.reloadSubscriptions$,
    ]).pipe(
      switchMap(([params, term]) => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.subscriptionService.getSubscriptions(String(accountId), term);
      })
    );
  }

  getSubscription(id: string) {
    this.route.paramMap.pipe(
      takeUntil(this.componentIsDestroyed$),
      switchMap(params => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.subscriptionService.getSubscription(String(accountId), String(id));
      })
    ).subscribe(subscription => {
      this.subscription = subscription;
      this.subscriptionForm.patchValue(subscription);
    });
  }

  updateSubscription(id: string, subscription: Subscriptions) {
    subscription = this.subscriptionForm.value;
    this.subscription = subscription;
    this.subscriptionService.updateSubscription(id, subscription)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.reloadSubscriptions();
      });
  }

  deleteSubscription(id: string) {
    this.subscriptionService.deleteSubscription(id)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.reloadSubscriptions();
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  private reloadSubscriptions(): void {
    this.reloadSubscriptions$.next(true);
  }
}
