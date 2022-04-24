import { Component, OnDestroy } from '@angular/core';
import { faCirclePlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Account } from './account';
import { AccountService } from './services/account.service';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TransactionService } from '../../../../features/main-page/transaction/services/transaction.service';
import { CommonService } from '../../../../shared/common/common.service';

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
  accounts$!: Observable<Account[]>;
  activeAccount: Subject<Account | null> = new Subject<Account | null>();
  accountForm = this.fb.group({
    title: [''],
    description: [''],
    currency: [''],
    availableAmount: ['0'],
  });

  constructor(private accountService: AccountService,
              private transactionService: TransactionService,
              private commonService: CommonService,
              private utilsService: UtilsService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.accounts$ = combineLatest([
      this.reloadAccounts$,
      this.accountService.getAccounts()
    ]).pipe(switchMap(() => {
      return this.accountService.getAccounts();
    }));

    this.accountService.getAccount(this.accountId)
      .pipe(
        takeUntil(this.componentIsDestroyed$)
      ).subscribe(account => {
      this.router.navigate([this.getBaseUrl() + '/' + account.id], {skipLocationChange: true});
      this.accountForm.patchValue(account);
      this.activeAccount.next(account);
      this.commonService.getUpdate().pipe(takeUntil(this.componentIsDestroyed$))
        .subscribe((amt: number) => {
          let newAmount = account.availableAmount + amt;
          account.availableAmount = newAmount;
          let newAcc = {...account, availableAmount: newAmount};
          this.updateAccount(String(this.accountId), newAcc);
        });
    });
  }

  get accountId(): string | null {
    return this.utilsService.accountId;
  }

  view: 'details' | 'edit' = 'details';
  mode: 'create' | 'default' = 'default';

  editView() {
    this.view = 'edit';
  }

  createMode() {
    this.mode = 'create';
    this.accountForm.reset();
  }

  detailsView() {
    this.mode = 'default';
    this.view = 'details';
    this.accountService.getAccount(this.accountId).pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(account => {
        this.accountForm.patchValue(account);
        this.activeAccount.next(account);
      });
  }

  addAccount(account: Account) {
    this.accountService.addAccount(account).pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe((newAcc) => {
        this.accountSelect(newAcc);
        this.activeAccount.next(newAcc);
        console.log(newAcc.id)
        this.reloadAccounts$.next(true);
      });
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
    if (!account) {
      account = this.accountForm.value;
    }
    this.accountService.updateAccount(id, account)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.activeAccount.next(account);
        this.reloadAccounts();
      });
  }

  updateAccountFromTr(id: string, account: Account) {
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
