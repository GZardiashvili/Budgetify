import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../card/card';

@Component({
  selector: 'ui-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  faEdit = faPenToSquare
  faClose = faXmark
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
  @Input() detailsInfo: Card | null = null;

  @Output() delete = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();


  currentView: 'details' | 'edit' = 'details';

  goToEdit() {
    this.currentView = 'edit';
  }

  goToDetails() {
    this.currentView = 'details';
  }

  constructor() {
  }

}
