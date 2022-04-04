import {Component, OnInit} from '@angular/core';
import {TransactionService} from "./services/transaction.service";
import {Transaction} from "./transaction";
import {Observable} from "rxjs";
import {AccountService} from "../../../layout/components/sidebar/accounts/account.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions: Observable<Transaction[]> = this.transactionService.getTransactions();

  constructor(private transactionService: TransactionService, private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

}
