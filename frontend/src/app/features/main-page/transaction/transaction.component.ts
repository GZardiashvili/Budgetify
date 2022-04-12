import { Component, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Transaction } from './transaction';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilsService } from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transactions$!: Observable<Transaction[]>;

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

}
