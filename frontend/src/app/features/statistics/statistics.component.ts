import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService } from './services/statistics.service';
import { UtilsService } from '../../shared/utils/utils.service';
import { Chart } from 'angular-highcharts'
import { Transaction } from '../main-page/transaction/transaction';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  statisticsArrOptions: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  incomes: number[] = [];
  expenses: number[] = [];
  economy: number[] = [];
  categories: string[] = ['Food', 'Clothes', 'Transport', 'Entertainment', 'Other'];
  monthlyStatistics!: Chart;
  categoriesStatistics!: Chart;
  report!: Chart;
  currentView: 'categoryStat' | 'monthlyStat' = 'categoryStat';

  constructor(
    private statisticsService: StatisticsService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
    this.statisticsService.getTransactions(this.utilsService.accountId)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(transactions => {
        let stats = this.utilsService.translateForStatistic(transactions)
        this.incomes = stats.pos;
        this.expenses = stats.neg;
        this.economy = stats.economy;
        this.createMonthlyStatistics();
        this.createCategoriesStatistics();
      });
  }

  transactions!: Transaction[];


  ngOnInit(): void {
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
    this.monthlyStatistics = chart;
    chart.ref$.pipe(
      takeUntil(this.componentIsDestroyed$)).subscribe();
  }

  createCategoriesStatistics() {
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
        categories: this.categories,
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
          name: 'Category',
          data: [
            {
              name: 'food',
              y: this.incomes[0]
            },
            {
              name: 'clothes',
              y: this.incomes[1]
            },
            {
              name: 'transport',
              y: this.incomes[2]
            },
            {
              name: 'health',
              y: this.incomes[3]
            },
            {
              name: 'entertainment',
              y: this.incomes[4]
            },
            {
              name: 'other',
              y: this.incomes[5]
            },
          ],
        },
      ],
    });
    this.categoriesStatistics = chart;
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
