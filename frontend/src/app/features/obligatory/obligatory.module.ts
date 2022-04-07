import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObligatoryComponent } from './obligatory.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ObligatoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ObligatoryComponent },
    ]),
  ],
})
export class ObligatoryModule {}
