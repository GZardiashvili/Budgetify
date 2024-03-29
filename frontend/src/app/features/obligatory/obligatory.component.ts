import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObligatoryService } from './services/obligatory.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Obligatory } from './obligatory';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common/common.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss'],
})
export class ObligatoryComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadObligates$ = new BehaviorSubject(true);

  obligates$!: Observable<Obligatory[]>;
  obligate!: Obligatory | null;
  accountId = this.utilsService.accountId;
  faPlus: IconProp = faPlus;


  obligateForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', ],
    amount: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
    dateOfPayment: ['', [Validators.required]],
    firstDateOfPayment: [''],
    lastDateOfPayment: [''],
  });

  constructor(
    private obligatoryService: ObligatoryService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.obligates$ = combineLatest([
      this.route.paramMap,
      this.commonService.getSearchTerm().pipe(
        takeUntil(this.componentIsDestroyed$),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.reloadObligates$,
    ]).pipe(
      switchMap(([params, term]) => {
        const id = params.get('accountId') || this.utilsService.accountId;
        return this.obligatoryService.getObligates(String(id), term);
      })
    );
  }

  view: 'details' | 'edit' = 'details';

  editView() {
    this.view = 'edit';
    this.obligateForm.reset();
  }

  detailsView() {
    this.view = 'details';
  }

  addObligatory(obligatory: Obligatory) {
    this.obligatoryService.addObligatory(String(this.accountId), obligatory).pipe(takeUntil(this.componentIsDestroyed$)).subscribe(() => {
      this.reloadObligates$.next(true);
    });
  }

  getObligate(id: string) {
    this.route.paramMap.pipe(
      takeUntil(this.componentIsDestroyed$),
      switchMap(params => {
        const accountId = params.get('accountId') || this.utilsService.accountId;
        return this.obligatoryService.getObligate(String(accountId), String(id));
      })
    ).subscribe(obligate => {
      this.obligate = obligate;
      this.obligateForm.patchValue(obligate);
    });
  }

  updateObligate(id: string, obligate: Obligatory) {
    obligate = this.obligateForm.value;
    this.obligate = obligate;
    this.obligatoryService.updateObligate(id, obligate)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.reloadObligates();
      });
  }

  deleteObligate(id: string) {
    this.obligatoryService.deleteObligate(id)
      .pipe(
        takeUntil(this.componentIsDestroyed$))
      .subscribe(() => {
        this.reloadObligates();
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  private reloadObligates(): void {
    this.reloadObligates$.next(true);
  }
}
