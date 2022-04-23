import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsComponent } from './details/details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [RegisterComponent, NotFoundComponent, CardComponent, DetailsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatSidenavModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    CardComponent,
    DetailsComponent,
    MatSidenavModule,
    FontAwesomeModule,
  ],
})
export class SharedModule {
}
