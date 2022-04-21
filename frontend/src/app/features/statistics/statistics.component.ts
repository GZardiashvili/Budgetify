import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  statisticsArrOptions: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthlyStatistics!: Chart;
  incomesCategoriesStatistics!: Chart;
  expensesCategoriesStatistics!: Chart;
  report!: Chart;
  currentView: 'categoryStat' | 'monthlyStat' = 'categoryStat';
  statistics!: any;

  constructor(
    private statisticsService: StatisticsService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {
    this.statisticsService.getStatistics(this.utilsService.accountId)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(statistics => {
        this.statistics = statistics;
        this.createMonthlyStatistics();
        this.createExpensesStatistics();
        this.createIncomesStatistics();
      });
  }

  createMonthlyStatistics() {
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
            {y: this.statistics.incomes[0]},
            {y: this.statistics.incomes[1]},
            {y: this.statistics.incomes[2]},
            {y: this.statistics.incomes[3]},
            {y: this.statistics.incomes[4]},
            {y: this.statistics.incomes[5]},
            {y: this.statistics.incomes[6]},
            {y: this.statistics.incomes[7]},
            {y: this.statistics.incomes[8]},
            {y: this.statistics.incomes[9]},
            {y: this.statistics.incomes[10]},
            {y: this.statistics.incomes[11]},
          ],
        },
        {
          type: 'line',
          color: '#EE3F19',
          name: 'Expenses',
          data: [
            {y: this.statistics.expenses[0]},
            {y: this.statistics.expenses[1]},
            {y: this.statistics.expenses[2]},
            {y: this.statistics.expenses[3]},
            {y: this.statistics.expenses[4]},
            {y: this.statistics.expenses[5]},
            {y: this.statistics.expenses[6]},
            {y: this.statistics.expenses[7]},
            {y: this.statistics.expenses[8]},
            {y: this.statistics.expenses[9]},
            {y: this.statistics.expenses[10]},
            {y: this.statistics.expenses[11]},
          ],
        },
        {
          type: 'line',
          color: '#6200EE',
          name: 'Econcomy',
          data: [
            {y: this.statistics.economy[0]},
            {y: this.statistics.economy[1]},
            {y: this.statistics.economy[2]},
            {y: this.statistics.economy[3]},
            {y: this.statistics.economy[4]},
            {y: this.statistics.economy[5]},
            {y: this.statistics.economy[6]},
            {y: this.statistics.economy[7]},
            {y: this.statistics.economy[8]},
            {y: this.statistics.economy[9]},
            {y: this.statistics.economy[10]},
            {y: this.statistics.economy[11]},
          ],
        },
      ],
    });
    this.monthlyStatistics = chart;
    chart.ref$.pipe(
      takeUntil(this.componentIsDestroyed$)).subscribe();
  }

  createExpensesStatistics() {
    const chart = new Chart({
      chart: {
        type: 'pie',
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
          type: 'pie',
          name: 'Expenses',
          data: [
            {
              name: this.statistics.expensesByCategory[0]?.category,
              y: this.statistics.expensesByCategory[0]?.amount,
            },
            {
              name: this.statistics.expensesByCategory[1]?.category,
              y: this.statistics.expensesByCategory[1]?.amount,
            },
            {
              name: this.statistics.expensesByCategory[2]?.category,
              y: this.statistics.expensesByCategory[2]?.amount,
            },
            {
              name: this.statistics.expensesByCategory[3]?.category,
              y: this.statistics.expensesByCategory[3]?.amount,
            },
            {
              name: this.statistics.expensesByCategory[4]?.category,
              y: this.statistics.expensesByCategory[4]?.amount,
            },
            {
              name: this.statistics.expensesByCategory[5]?.category,
              y: this.statistics.expensesByCategory[5]?.amount,
            },
          ],
        },
      ],
    });
    this.expensesCategoriesStatistics = chart;
    chart.ref$.pipe(
      takeUntil(this.componentIsDestroyed$)).subscribe();
  }

  createIncomesStatistics() {
    const chart = new Chart({
      chart: {
        type: 'pie',
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
          type: 'pie',
          name: 'Incomes',
          data: [
            {
              name: this.statistics.incomesByCategory[0]?.category,
              y: this.statistics.incomesByCategory[0]?.amount,
            },
            {
              name: this.statistics.incomesByCategory[1]?.category,
              y: this.statistics.incomesByCategory[1]?.amount,
            },
            {
              name: this.statistics.incomesByCategory[2]?.category,
              y: this.statistics.incomesByCategory[2]?.amount,
            },
            {
              name: this.statistics.incomesByCategory[3]?.category,
              y: this.statistics.incomesByCategory[3]?.amount,
            },
            {
              name: this.statistics.incomesByCategory[4]?.category,
              y: this.statistics.incomesByCategory[4]?.amount,
            },
            {
              name: this.statistics.incomesByCategory[5]?.category,
              y: this.statistics.incomesByCategory[5]?.amount,
            },
          ],
        },
      ],
    });
    this.incomesCategoriesStatistics = chart;
    chart.ref$.pipe(
      takeUntil(this.componentIsDestroyed$)).subscribe();
  }

  goToMonthly() {
    this.currentView = 'monthlyStat';
  }

  goToCategory() {
    this.currentView = 'categoryStat';
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
