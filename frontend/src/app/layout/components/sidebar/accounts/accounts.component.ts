import { Component, OnDestroy } from '@angular/core';
import { faCirclePlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Account } from './account';
import { AccountService } from './services/account.service';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  faDetails = faEllipsis;
  faAdd = faCirclePlus;
  accounts: Observable<Account[]> = this.accountService.getAccounts();
  activeAccount: Subject<Account | null> = new Subject<Account | null>();
  accountForm = this.fb.group({
    title: [''],
    description: [''],
    currency: [''],
    availableAmount: [''],
  });

  constructor(private accountService: AccountService,
              private utilsService: UtilsService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.accountService.getAccount(this.accountId)
      .pipe(
        takeUntil(this.componentIsDestroyed$)
      ).subscribe(account => {
      this.router.navigate([this.getBaseUrl() + '/' + account.id], {skipLocationChange: true});
      this.activeAccount.next(account);
      this.accountForm.patchValue(account);
    });
  }

  get accountId(): string | null {
    return this.utilsService.accountId;
  }

  addAccount(account: Account) {
    this.accountService.addAccount(account);
  }

  getBaseUrl() {
    return this.router.url.split('/')[1];
  }

  accountSelect(account: Account) {
    this.router.navigate([this.getBaseUrl() + '/' + account.id], {skipLocationChange: true});
    this.utilsService.setAccountId(account.id);
    this.accountForm.patchValue(account);
    this.activeAccount.next(account);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
