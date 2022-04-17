import { Component, OnInit, } from '@angular/core';
import { faCirclePlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Account } from './account';
import { AccountService } from './services/account.service';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  faDetails = faEllipsis;
  faAdd = faCirclePlus;
  accounts: Observable<Account[]> = this.accountService.getAccounts();
  activeAccount: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);

  constructor(private accountService: AccountService,
              private utilsService: UtilsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.accountService.getAccountById(this.accountId).subscribe(account => {
      this.activeAccount.next(account);
    });
  }

  get accountId(): string | null {
    return this.utilsService.accountId;
  }

  addAccount(account: Account) {
    this.accountService.addAccount(account);
  }

  setAccountId(accountId: string) {
    this.utilsService.setAccountId(accountId);
  }

  getBaseUrl() {
    return this.router.url.split('/')[1];
  }

  accountSelect() {
    this.router.navigate([this.getBaseUrl() + '/' + this.accountId], {skipLocationChange: true});
    this.accountService.getAccountById(this.accountId).subscribe(account => {
      this.activeAccount.next(account);
    });
  }
}
