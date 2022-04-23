import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { PiggyBankService } from './services/piggy-bank.service';
import { PiggyBank } from './piggy-bank';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../../shared/utils/utils.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../shared/common/common.service';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrls: ['./piggy-bank.component.scss'],
})
export class PiggyBankComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadPiggyBanks$ = new BehaviorSubject(true);
  accountId = this.utilsService.accountId;

  faPiggyBank = faPiggyBank;
  piggyBanks$!: Observable<PiggyBank[]>;
  piggyBank!: PiggyBank | null;
  piggyBankForm = this.fb.group({
    goal: [''],
    goalAmount: [''],
    description: [''],
    savings: ['0'],
    crashDate: [''],
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private piggyBankService: PiggyBankService,
              private commonService: CommonService,
              private utilsService: UtilsService,
  ) {
  }

  ngOnInit() {
    this.piggyBanks$ = combineLatest([
      this.route.paramMap,
      this.reloadPiggyBanks$,
    ]).pipe(
      switchMap(([params]) => {
        return this.piggyBankService.getPiggyBanks(String(this.accountId));
      })
    );
  }

  view: 'details' | 'edit' = 'details';

  editView() {
    this.view = 'edit';
    this.piggyBankForm.reset();
  }

  detailsView() {
    this.view = 'details';
  }

  addPiggyBank(piggyBank: PiggyBank) {
    this.piggyBankService.addPiggyBank(String(this.accountId), piggyBank).subscribe(() => {
      this.reloadPiggyBanks$.next(true);
    });
  }

  getPiggyBank(id: string) {
    this.route.paramMap.pipe(
      takeUntil(this.componentIsDestroyed$),
      switchMap(params => {
        return this.piggyBankService.getPiggyBank(String(this.accountId), String(id));
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

  crashPiggyBank(id: string) {
    let piggySnapshot = this.piggyBank;

    this.piggyBankService.deletePiggyBank(id)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.commonService.sendUpdate(piggySnapshot!.savings);
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
