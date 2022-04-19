import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCirclePlus, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Account } from './account';
import { AccountService } from './services/account.service';
import { UtilsService } from '../../../../shared/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { switchMap, takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  faDetails = faEllipsis;
  faAdd = faCirclePlus;
  accounts: Observable<Account[]> = this.accountService.getAccounts();
  account$!: Observable<Account>;
  activeAccount: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
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
    this.accountService.getAccountById(this.accountId).pipe(
      takeUntil(this.componentIsDestroyed$))
      .subscribe(account => {
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

  getAccount(id: string) {
    this.account$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.accountService.getAccountById(String(id));
      })
    );
    this.account$.pipe(
      takeUntil(this.componentIsDestroyed$),
      tap(account => {
        this.accountForm.patchValue(account);
      })).subscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
