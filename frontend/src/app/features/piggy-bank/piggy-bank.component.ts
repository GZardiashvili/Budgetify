import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { PiggyBankService } from './services/piggy-bank.service';
import { PiggyBank } from './piggy-bank';
import { Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../../shared/utils/utils.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrls: ['./piggy-bank.component.scss'],
})
export class PiggyBankComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  faPiggyBank = faPiggyBank;
  piggyBanks$!: Observable<PiggyBank[]>;
  piggyBank$!: Observable<PiggyBank>;
  piggyBankForm = this.fb.group({
    goal: [''],
    goalAmount: [''],
    description: [''],
    savings: [''],
    crashDate: [''],
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private piggyBankService: PiggyBankService,
              private utilsService: UtilsService,
  ) {
  }

  ngOnInit() {
    const accountId = this.utilsService.accountId;
    this.piggyBanks$ = this.piggyBankService.getPiggyBanks(accountId);
  }

  getPiggyBank(id: string) {
    this.piggyBank$ = this.route.paramMap.pipe(
      switchMap(params => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.piggyBankService.getPiggyBank(String(accountId), String(id));
      })
    );

    this.piggyBank$.pipe(
      takeUntil(this.componentIsDestroyed$),
      tap(piggyBank => {
        this.piggyBankForm.patchValue(piggyBank);
      })).subscribe();
  }

  updatePiggyBank(id: string, piggyBank: PiggyBank) {
    piggyBank = this.piggyBankForm.value;
    this.piggyBankService.updatePiggyBank(id, piggyBank)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe();
    this.piggyBanks$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const accountId = params.get('accountId') || this.utilsService.accountId;
          return this.piggyBankService.getPiggyBanks(String(accountId));
        })
      );
  }

  deletePiggyBank(id: string) {
    this.piggyBankService.deletePiggyBank(id)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe();
    this.piggyBanks$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const accountId = params.get('accountId') || this.utilsService.accountId;
          return this.piggyBankService.getPiggyBanks(String(accountId));
        })
      );
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
