import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { faCircleArrowDown, faCircleArrowUp, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../card/card';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Category } from '../../features/categories/category';
import { CategoryService } from '../../features/categories/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ui-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  faEdit = faPenToSquare
  faClose = faXmark
  @Input() title: string = ''
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
    dateOfOperation: [''],
    goal: [''],
    goalAmount: [''],
    savings: [''],
    availableAmount: [''],
  });
  faExpense = faCircleArrowUp;
  faIncome = faCircleArrowDown

  @Input()
  get detailsInfo(): Card | null {
    return this._detailsInfo;
  }

  set detailsInfo(detailsInfo: Card | null) {
    this._detailsInfo = (detailsInfo) || null;
  }

  private _detailsInfo: Card | null = null;

  @Input() icon: IconProp | null = null;
  @Input() btnText: string = 'Delete';

  @Output() delete = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();


  @Input() currentView: 'details' | 'edit' = 'details';
  @Input() categories!: Category[] | null;

  ngOnInit() {
    this.detailsForm.get('category')?.setValue(this.detailsInfo?.category);
  }

  openSnackBar() {
    this._snackBar.open(`The operation was completed successfully`, 'Close', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });
  }

  chooseIncomes() {
    this.detailsForm.get('type')?.setValue('incomes');
  }

  chooseExpenses() {
    this.detailsForm.get('type')?.setValue('expenses');
  }

  goToEdit() {
    this.currentView = 'edit';
  }

  goToDetails() {
    this.currentView = 'details';
  }

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private _snackBar: MatSnackBar) {
  }


}
