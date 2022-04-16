import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObligatoryService } from './services/obligatory.service';
import { Observable, Subject } from 'rxjs';
import { Obligatory } from './obligatory';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss'],
})
export class ObligatoryComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  obligates$!: Observable<Obligatory[]>;
  obligate$!: Observable<Obligatory>;

  // obligateForm: FormGroup = new FormGroup({
  //   title: new FormControl(''),
  //   description: new FormControl(''),
  //   amount: new FormControl(''),
  // });
  obligateForm = this.fb.group({
    title: [''],
    description: [''],
    amount: [''],
  });

  constructor(
    private obligatoryService: ObligatoryService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.obligates$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
          return this.obligatoryService.getObligates(String(id));
        })
      );
  }

  getObligate(id: string) {
    this.obligate$ = this.route.paramMap.pipe(
      switchMap(params => {
        const accountId = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
        return this.obligatoryService.getObligate(String(accountId), String(id));
      })
    );

    this.obligate$.pipe(
      takeUntil(this.componentIsDestroyed$),
      tap(obligate => {
        this.obligateForm.patchValue(obligate)
      })).subscribe();
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
