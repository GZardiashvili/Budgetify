import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './transaction';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../../shared/utils/utils.service';
import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadTransactions$ = new BehaviorSubject(true);

  transactions$!: Observable<Transaction[]>;
  transaction!: Transaction | null;
  faExpense = faCircleArrowUp;
  faIncome = faCircleArrowDown

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
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.transactions$ = combineLatest([
      this.route.paramMap,
      this.reloadTransactions$,
    ]).pipe(
      switchMap(([params]) => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.transactionService.getTransactions(String(accountId));
      })
    );
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
    transaction = this.transactionForm.value;
    this.transaction = transaction;
    this.transactionService.updateTransaction(id, transaction)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.reloadTransactions()
      });
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
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
