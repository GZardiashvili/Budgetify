import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChartModule } from 'angular-highcharts';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: StatisticsComponent},
    ]),
    MatFormFieldModule,
    MatSelectModule,
    ChartModule,
    MatTableModule,
  ],
})
export class StatisticsModule {}
