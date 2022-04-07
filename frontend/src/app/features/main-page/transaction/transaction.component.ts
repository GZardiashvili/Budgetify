import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionService} from './services/transaction.service';
import {Transaction} from './transaction';
import {Observable, Subject} from 'rxjs';
import {AccountService} from '../../../layout/components/sidebar/accounts/account.service';
import {ActivatedRoute} from "@angular/router";
import {takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  transactions!: Observable<Transaction[]>;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.componentIsDestroyed$)).subscribe(params => {
      this.transactions = this.transactionService.getTransactions(params.accountId)
    })
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
