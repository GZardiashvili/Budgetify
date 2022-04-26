import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionService } from './services/subscription.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Subscriptions } from './subscriptions';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common/common.service';
import { Category } from '../categories/category';
import { CategoryService } from '../categories/services/category.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
  categories$!: Observable<Category[]>;
  accountId = this.utilsService.accountId;
  faPlus: IconProp = faPlus;


  subscriptionForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
    description: [''],
    amount: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]],
    dateOfPayment: ['', [Validators.required]],
    firstDateOfPayment: [''],
    lastDateOfPayment: [''],
  });

  constructor(
    private subscriptionService: SubscriptionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private fb: FormBuilder,
    private commonService: CommonService,
  ) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories('');
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

  view: 'details' | 'edit' = 'details';

  editView() {
    this.view = 'edit';
    this.subscriptionForm.reset();
  }

  detailsView() {
    this.view = 'details';
  }

  addSubscription(subscription: Subscriptions) {
    this.subscriptionService.addSubscription(String(this.accountId), subscription).pipe(takeUntil(this.componentIsDestroyed$)).subscribe(() => {
      this.reloadSubscriptions$.next(true);
    });
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
