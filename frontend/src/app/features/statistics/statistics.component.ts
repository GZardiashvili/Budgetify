import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistics } from './statistics';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService } from './services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  statistics$!: Observable<Statistics>;

  constructor(
    private statisticsService: StatisticsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.statistics$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId');
          return this.statisticsService.getStatistics(String(id));
        })
      );
  }
}
