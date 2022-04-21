import { Component, OnDestroy } from '@angular/core';
import { faCirclePlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Account } from './account';
import { AccountService } from './services/account.service';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadAccounts$ = new BehaviorSubject(true);

  faDetails = faEllipsis;
  faAdd = faCirclePlus;
  accounts$: Observable<Account[]> = this.accountService.getAccounts();
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

  updateAccount(id: string, account: Account) {
    account = this.accountForm.value;
    this.accountService.updateAccount(id, account)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.activeAccount.next(account);
        this.reloadAccounts();
      });
  }

  deleteAccount(id: string) {
    this.accountService.deleteAccount(id)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.reloadAccounts();
      });
    this.accountService.getAccounts()
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(accounts => {
        if (accounts.length > 0) {
          this.router.navigate([this.getBaseUrl() + '/' + accounts[0].id], {skipLocationChange: true});
          this.utilsService.setAccountId(accounts[0].id);
          this.accountForm.patchValue(accounts[0]);
          this.activeAccount.next(accounts[0]);
        } else {
          this.router.navigate([this.getBaseUrl() + '/new'], {skipLocationChange: true});
          this.utilsService.setAccountId(null);
          this.accountForm.reset();
          this.activeAccount.next(null);
        }
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  private reloadAccounts(): void {
    this.reloadAccounts$.next(true);
  }
}
