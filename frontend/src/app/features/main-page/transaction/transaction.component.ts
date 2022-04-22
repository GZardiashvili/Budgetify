import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './transaction';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UtilsService } from '../../../shared/utils/utils.service';
import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl } from '@angular/forms';
import { CommonService } from '../../../shared/common/common.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadTransactions$ = new BehaviorSubject(true);
  searchControl = new FormControl('', []);
  transactions$!: Observable<Transaction[]>;
  transaction!: Transaction | null;
  faExpense = faCircleArrowUp;
  faIncome = faCircleArrowDown
  term: string = '';

  transactionForm = this.fb.group({
    type: [''],
    title: [''],
    description: [''],
    category: [''],
    currency: [''],
    amount: [''],
    dateOfOperation: [''],
    linkToFile: [''],
  });

  constructor(
    private transactionService: TransactionService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.transactions$ = combineLatest([
      this.route.paramMap,
      this.commonService.getSearchTerm().pipe(
        takeUntil(this.componentIsDestroyed$),
        debounceTime(1000),
        distinctUntilChanged(),
      ),
      this.reloadTransactions$,
    ]).pipe(
      switchMap(([params, term]) => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.transactionService.getTransactions(String(accountId), term);
      })
    );
  }

  createTransaction() {
    const transaction = this.transactionForm.value;
    this.transactionService.createTransaction(transaction).subscribe(() => {
      this.reloadTransactions$.next(true);
    });
  }

  getTransaction(id: string) {
    this.route.paramMap.pipe(
      takeUntil(this.componentIsDestroyed$),
      switchMap(params => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.transactionService.getTransaction(String(accountId), String(id));
      })
    ).subscribe(transaction => {
      this.transaction = transaction;
      this.transactionForm.patchValue(transaction);
    });
  }

  updateTransaction(id: string, transaction: Transaction) {
    let prevTransaction = this.transaction;
    transaction = this.transactionForm.value;
    this.transaction = transaction;
    this.transactionService.updateTransaction(id, transaction)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        let diff = 0;
        if (transaction.type === 'incomes') {
          diff = transaction.amount - prevTransaction!.amount;
        } else {
          diff = prevTransaction!.amount - transaction.amount;
        }
        this.commonService.sendUpdate(diff);
        this.reloadTransactions()
      });
  }

  deleteTransaction(id: string) {
    let trSnapshot = this.transaction;
    this.transactionService.deleteTransaction(id)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        let diff = 0;
        if (trSnapshot!.type === 'incomes') {
          diff = diff - trSnapshot!.amount;
        } else {
          diff = diff + trSnapshot!.amount;
        }
        this.commonService.sendUpdate(diff);
        this.reloadTransactions()
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  private reloadTransactions(): void {
    this.reloadTransactions$.next(true);
  }
}
