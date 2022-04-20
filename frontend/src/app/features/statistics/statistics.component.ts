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
  incomes: number[] = [20, 10, 5, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  expenses: number[] = [10, 50, 100, 30, 15, 20, 30, 40, 50, 60, 70, 80, 70];
  economy: number[] = [5, 15, 12, 30, 17, 20, 30, 40, 52, 50, 30, 35, 45];
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
    // this.statistics$ = this.route.paramMap
    //   .pipe(
    //     switchMap(params => {
    //       const id = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
    //       return this.statisticsService.getStatistics(String(id));
    //     })
    //   );
  }

  createStatistics(id: string) {
    // this.statistics$;
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
          color: '#1FC222',
          name: 'Incomes',
          data: [
            {y: this.incomes[0]},
            {y: this.incomes[1]},
            {y: this.incomes[2]},
            {y: this.incomes[3]},
            {y: this.incomes[4]},
            {y: this.incomes[5]},
            {y: this.incomes[6]},
            {y: this.incomes[7]},
            {y: this.incomes[8]},
            {y: this.incomes[9]},
            {y: this.incomes[10]},
            {y: this.incomes[11]},
          ],
        },
        {
          type: 'line',
          color: '#EE3F19',
          name: 'Expenses',
          data: [
            {y: this.expenses[0]},
            {y: this.expenses[1]},
            {y: this.expenses[2]},
            {y: this.expenses[3]},
            {y: this.expenses[4]},
            {y: this.expenses[5]},
            {y: this.expenses[6]},
            {y: this.expenses[7]},
            {y: this.expenses[8]},
            {y: this.expenses[9]},
            {y: this.expenses[10]},
            {y: this.expenses[11]},
          ],
        },
        {
          type: 'line',
          color: '#6200EE',
          name: 'Econcomy',
          data: [
            {y: this.economy[0]},
            {y: this.economy[1]},
            {y: this.economy[2]},
            {y: this.economy[3]},
            {y: this.economy[4]},
            {y: this.economy[5]},
            {y: this.economy[6]},
            {y: this.economy[7]},
            {y: this.economy[8]},
            {y: this.economy[9]},
            {y: this.economy[10]},
            {y: this.economy[11]},
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
