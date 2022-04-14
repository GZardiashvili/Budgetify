import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ui-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() detailsForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    type: new FormControl(''),
    accountId: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    currency: new FormControl(''),
    amount: new FormControl(''),
    frequency: new FormControl(''),
    linkToFile: new FormControl(''),
    dateOfOperation: new FormControl(''),
    dateOfCreation: new FormControl(''),
    dateOfUpdate: new FormControl(''),
    firstDayOfPayment: new FormControl(''),
    lastDayOfPayment: new FormControl(''),
    dayOfPayment: new FormControl(''),
  });

  constructor() {
  }

}
