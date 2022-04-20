import {
  Component, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
} from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './transaction';
import { Observable, Subject } from 'rxjs';
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
  transactions!: Transaction[];
  transaction!: Transaction;
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
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId') || this.utilsService.accountId;
          return this.transactionService.getTransactions(String(id));
        })
      ).subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  getTransaction(accountId: string, id: string) {
    this.transactionService.getTransaction(accountId, id).pipe(takeUntil(this.componentIsDestroyed$)).subscribe(transaction => {
      this.transactionForm.patchValue(transaction);
      this.transaction = transaction;
    });
  }

  updateTransaction(accountId: string, id: string, transaction: Transaction) {
    transaction = this.transactionForm.value;
    this.transactionService.updateTransaction(id, transaction)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe();
    this.transactions = this.transactions.map(tr => tr.id === id ? transaction : tr);
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe();
    this.transactions = this.transactions.filter(tr => tr.id !== id);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
