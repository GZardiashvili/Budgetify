import { Component, OnInit } from '@angular/core';
import { ObligatoryService } from './services/obligatory.service';
import { Observable } from 'rxjs';
import { Obligatory } from './obligatory';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss'],
})
export class ObligatoryComponent implements OnInit {
  obligates$!: Observable<Obligatory[]>;
  obligate$!: Observable<Obligatory>;

  obligateForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(''),
  });

  constructor(
    private obligatoryService: ObligatoryService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
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

    this.obligate$.pipe(tap(obligate => {

      this.obligateForm.get('title')?.setValue(obligate.title);
      this.obligateForm.get('description')?.setValue(obligate.description);
      this.obligateForm.get('currency')?.setValue(obligate.currency);
      this.obligateForm.get('amount')?.setValue(obligate.amount);

    })).subscribe();
  }
}
