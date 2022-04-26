import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  faCircleArrowDown,
  faCircleArrowUp, faMinusCircle,
  faPenToSquare,
  faPlusCircle,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { Card } from '../card/card';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Category } from '../../features/categories/category';
import { CategoryService } from '../../features/categories/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Currency} from "../../layout/components/sidebar/accounts/currency";
import {MatDialog} from "@angular/material/dialog";

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
    payee: ['']
  });
  faExpense = faCircleArrowUp;
  faIncome = faCircleArrowDown;
  faPlus = faPlusCircle;
  faMinus = faMinusCircle;
  showHideSavings = false;
  @Input() currency: Currency | null = null;
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
  @Input() currencies!: Currency[] | null;

  ngOnInit() {
    this.detailsForm.get('category')?.setValue(this.detailsInfo?.category);

  }
  showSavingsInput(){
    this.showHideSavings = !this.showHideSavings;
  }
  openSnackBar(message:string, className:string = 'snackbar-success') {
    this._snackBar.open(
      message,
      'Close', {
      duration: 5000,
      panelClass: [className]
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete.emit();
        this.openSnackBar(this.btnText+'d successfully')
      }
    });
  }

  openDialogForPiggyBank() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogCrash);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.delete.emit();
        this.openSnackBar(this.btnText+'d successfully')
      }
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

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private _snackBar: MatSnackBar, private dialog: MatDialog) {
  }


}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}

@Component({
  selector: 'dialog-content-example-dialog-crash',
  templateUrl: 'dialog-content-example-dialog-crash.html',
})
export class DialogContentExampleDialogCrash {}
