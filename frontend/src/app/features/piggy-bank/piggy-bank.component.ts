import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { PiggyBankService } from './services/piggy-bank.service';
import { PiggyBank } from './piggy-bank';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../../shared/utils/utils.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrls: ['./piggy-bank.component.scss'],
})
export class PiggyBankComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadPiggyBanks$ = new BehaviorSubject(true);

  faPiggyBank = faPiggyBank;
  piggyBanks$!: Observable<PiggyBank[]>;
  piggyBank!: PiggyBank | null;
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
    this.piggyBanks$ = combineLatest([
      this.route.paramMap,
      this.reloadPiggyBanks$,
    ]).pipe(
      switchMap(([params]) => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.piggyBankService.getPiggyBanks(String(accountId));
      })
    );
  }

  getPiggyBank(id: string) {
    this.route.paramMap.pipe(
      takeUntil(this.componentIsDestroyed$),
      switchMap(params => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.piggyBankService.getPiggyBank(String(accountId), String(id));
      })
    ).subscribe(piggyBank => {
      this.piggyBank = piggyBank;
      this.piggyBankForm.patchValue(piggyBank);
    });
  }

  updatePiggyBank(id: string, piggyBank: PiggyBank) {
    piggyBank = this.piggyBankForm.value;
    this.piggyBank = piggyBank;
    this.piggyBankService.updatePiggyBank(id, piggyBank)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.reloadPiggyBanks();
      });
  }

  deletePiggyBank(id: string) {
    this.piggyBankService.deletePiggyBank(id)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.reloadPiggyBanks();
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  private reloadPiggyBanks(): void {
    this.reloadPiggyBanks$.next(true);
  }
}
