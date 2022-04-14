import { Component, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './transaction';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { UtilsService } from '../../../shared/utils/utils.service';
import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transactions$!: Observable<Transaction[]>;
  transaction$!: Observable<Transaction>;
  faExpense = faCircleArrowUp;
  faIncome = faCircleArrowDown

  transactionForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    currency: new FormControl(''),
    amount: new FormControl(''),
    linkToFile: new FormControl(''),
  });

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.transactions$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
          return this.transactionService.getTransactions(String(id));
        })
      );
  }

  getTransaction(id: string) {
    this.transaction$ = this.route.paramMap.pipe(
      switchMap(params => {
        const accountId = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
        return this.transactionService.getTransaction(String(accountId), String(id));
      })
    );

    this.transaction$.pipe(tap(transaction => {
      this.transactionForm.get('type')?.setValue(transaction.title);
      this.transactionForm.get('title')?.setValue(transaction.title);
      this.transactionForm.get('description')?.setValue(transaction.description);
      this.transactionForm.get('category')?.setValue(transaction.category);
      this.transactionForm.get('currency')?.setValue(transaction.currency);
      this.transactionForm.get('amount')?.setValue(transaction.amount);
      this.transactionForm.get('linkToFile')?.setValue(transaction.linkToFile);
    })).subscribe();
  }
}
