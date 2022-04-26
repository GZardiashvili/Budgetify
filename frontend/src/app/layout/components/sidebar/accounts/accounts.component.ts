import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {faCirclePlus, faEllipsis} from '@fortawesome/free-solid-svg-icons';
import {Account} from './account';
import {AccountService} from './services/account.service';
import {UtilsService} from '../../../../shared/utils/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {switchMap, takeUntil} from 'rxjs/operators';
import {TransactionService} from '../../../../features/main-page/transaction/services/transaction.service';
import {CommonService} from '../../../../shared/common/common.service';
import {Currency} from "./currency";
import {CurrencyService} from "./services/currency.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadAccounts$ = new BehaviorSubject(true);
  @Output() enabled: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  faDetails = faEllipsis;
  faAdd = faCirclePlus;
  accounts$!: Observable<Account[]>;
  activeAccount: Subject<Account | null> = new Subject<Account | null>();
  accountForm = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    currency: ['', [Validators.required]],
    availableAmount: [''],
  });
  currencies$!: Observable<Currency[]>;
  currency!: Currency;

  constructor(private accountService: AccountService,
              private currencyService: CurrencyService,
              private transactionService: TransactionService,
              private commonService: CommonService,
              private utilsService: UtilsService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.currencies$ = this.currencyService.getCurrencies();
    this.accounts$ = combineLatest([
      this.reloadAccounts$,
      this.accountService.getAccounts()
    ]).pipe(switchMap(() => {
      if (this.accountId) {
        this.enabled.emit(true);
      }
      return this.accountService.getAccounts();
    }));
    if (this.accountId) {
      this.accountService.getAccount(this.accountId)
        .pipe(
          takeUntil(this.componentIsDestroyed$)
        ).subscribe(account => {
        this.router.navigate([this.getBaseUrl() + '/' + account?.id], {skipLocationChange: true});
        this.accountForm.patchValue(account);
        this.activeAccount.next(account);
        this.commonService.getUpdate().pipe(takeUntil(this.componentIsDestroyed$))
          .subscribe((amt: number) => {
            let newAmount;
            if (account?.availableAmount !== null) {
              newAmount = account?.availableAmount + amt;

            } else {
              newAmount = 0 + amt;

            }
            // account.availableAmount = newAmount;
            let newAcc = {...account, availableAmount: newAmount};
            this.updateAccount(String(this.accountId), newAcc);
          });
        this.currencyService.getCurrency(account.currency).pipe(takeUntil(this.componentIsDestroyed$))
          .subscribe(currency => {
            this.currency = currency;
          });
      });
    }
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
        this.accountForm.get('availableAmount')?.setValue('0');
        this.accountSelect(newAcc);
        this.activeAccount.next(newAcc);
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
    this.currencyService.getCurrency(account.currency).pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(currency => {
        this.currency = currency;
      });

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
