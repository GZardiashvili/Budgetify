import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObligatoryComponent } from './obligatory.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ObligatoryComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', pathMatch: 'full', component: ObligatoryComponent},
        ]),
        SharedModule,
    ],
})
export class ObligatoryModule {}
