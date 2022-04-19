import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './transaction';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
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
  transactions$!: Observable<Transaction[]>;
  transactions: Transaction[] = [];
  transaction$!: Observable<Transaction>;
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
    this.transactions$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId') || this.utilsService.accountId;
          return this.transactionService.getTransactions(String(id));
        })
      );
  }


  getTransaction(id: string) {
    this.transaction$ = this.route.paramMap.pipe(
      switchMap(params => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.transactionService.getTransaction(String(accountId), String(id));
      })
    );

    this.transaction$.pipe(
      takeUntil(this.componentIsDestroyed$),
      tap(transaction => {
        this.transactionForm.patchValue(transaction);
      })).subscribe();
  }

  updateTransaction(id: string, transaction: Transaction) {
    transaction = this.transactionForm.value;
    this.transactionService.updateTransaction(id, transaction)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe();
    this.transactions$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const accountId = params.get('accountId') || this.utilsService.accountId;
          return this.transactionService.getTransactions(String(accountId));
        })
      );
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe();
    this.transactions$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const accountId = params.get('accountId') || this.utilsService.accountId;
          return this.transactionService.getTransactions(String(accountId));
        })
      );
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
