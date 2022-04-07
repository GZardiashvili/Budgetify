import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObligatoryService} from './services/obligatory.service';
import {Observable, Subject} from 'rxjs';
import {Obligatory} from './obligatory';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss'],
})
export class ObligatoryComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  obligates!: Observable<Obligatory[]>;

  constructor(private obligatoryService: ObligatoryService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.componentIsDestroyed$)).subscribe(params => {
      this.obligates = this.obligatoryService.getObligates(params.accountId)
    })
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
