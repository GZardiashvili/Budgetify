import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Statistics } from './statistics';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService } from './services/statistics.service';
import { UtilsService } from '../../shared/utils/utils.service';
import { Chart } from 'angular-highcharts'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  statistics$!: Observable<Statistics>;
  statisticsArrOptions: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  statisticsArrValues: number[] = [];
  name = 'Statistics';
  chart!: Chart;

  constructor(
    private statisticsService: StatisticsService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.createChart()
    this.statistics$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
          return this.statisticsService.getStatistics(String(id));
        })
      );
  }

  createStatistics(id: string) {
    this.statistics$;
    // this.statisticsService.getReport(id).pipe(tap(r => {
    //   this.reportArrValues = Object.values(r);
    // })).subscribe();
    // this.reportService.getProgramById(id).pipe(tap(p => {
    //   this.name = p.name;
    // })).subscribe();
    // this.report$ = this.reportService.getReport(id);
  }

  createChart() {
    const chart = new Chart({
      chart: {
        type: 'line',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      yAxis: {
        visible: true,
        min: 0,
        minTickInterval: 1,
        allowDecimals: false
      },
      legend: {
        enabled: true,
      },
      xAxis: {
        lineColor: '#fff',
        categories: this.statisticsArrOptions,
        min: 0,
        minTickInterval: 1,
        allowDecimals: false
      },
      plotOptions: {
        series: {
          borderRadius: 5,
        } as any,
      },
      series: [
        {
          type: 'line',
          color: '#72b5e9',
          name: this.name,
          data: [
            {y: this.statisticsArrValues[0]},
            {y: this.statisticsArrValues[1]},
            {y: this.statisticsArrValues[2]},
            {y: this.statisticsArrValues[3]},
            {y: this.statisticsArrValues[4]},
            {y: this.statisticsArrValues[5]},
            {y: this.statisticsArrValues[6]},
            {y: this.statisticsArrValues[7]},
            {y: this.statisticsArrValues[8]},
            {y: this.statisticsArrValues[9]},
            {y: this.statisticsArrValues[10]},
            {y: this.statisticsArrValues[11]},
          ],
        },
      ],
    });
    this.chart = chart;
    chart.ref$.pipe(
      takeUntil(this.componentIsDestroyed$)).subscribe();
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
