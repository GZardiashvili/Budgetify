import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  @Input() detailsForm = this.fb.group({
    id: [''],
    type: [''],
    accountId: [''],
    title: [''],
    description: [''],
    category: [''],
    currency: [''],
    amount: [''],
    frequency: [''],
    linkToFile: [''],
    dateOfCreation: [''],
    dateOfUpdate: [''],
    firstDateOfPayment: [''],
    lastDateOfPayment: [''],
    dateOfPayment: [''],
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

  constructor(private fb: FormBuilder) {
  }

}