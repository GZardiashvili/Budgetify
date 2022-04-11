import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObligatoryService } from './services/obligatory.service';
import { Observable, Subject } from 'rxjs';
import { Obligatory } from './obligatory';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss'],
})
export class ObligatoryComponent implements OnInit {
  obligates$!: Observable<Obligatory[]>;

  constructor(
    private obligatoryService: ObligatoryService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.obligates$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId');
          return this.obligatoryService.getObligates(String(id));
        })
      );
  }
}
