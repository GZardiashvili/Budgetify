import { Component, OnInit } from '@angular/core';
import { ObligatoryService } from './services/obligatory.service';
import { Observable } from 'rxjs';
import { Obligatory } from './obligatory';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss'],
})
export class ObligatoryComponent implements OnInit {
  obligates$!: Observable<Obligatory[]>;

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
}
