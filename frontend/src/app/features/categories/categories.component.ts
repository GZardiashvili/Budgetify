import {Component, OnInit} from '@angular/core';
import {CategoryService} from './services/category.service';
import {Category} from './category';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faCircleArrowDown, faCircleArrowUp, faPlus, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';
import {CommonService} from '../../shared/common/common.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadCategories$ = new BehaviorSubject(true);
  faPlus: IconProp = faPlus;
  faEdit: IconProp = faEdit;
  faXMark: IconProp = faXmark;
  faExpense = faCircleArrowUp;
  faIncome = faCircleArrowDown
  categories$!: Observable<Category[]> | null;
  category!: Category | null;
  categoryForm = this.fb.group({
    title: ['', [Validators.required]],
    type: ['', [Validators.required]],
  })

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private commonService: CommonService,
              private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.categories$ = combineLatest([
      this.commonService.getSearchTerm().pipe(
        takeUntil(this.componentIsDestroyed$),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.reloadCategories$,
    ]).pipe(
      switchMap(([term]) => {
        return this.categoryService.getCategories(term);
      })
    );
  }

  chooseIncomes() {
    this.categoryForm.get('type')?.setValue('incomes');
  }

  chooseExpenses() {
    this.categoryForm.get('type')?.setValue('expenses');
  }

  getCategory(id: string) {
    return this.categoryService.getCategory(id).pipe(takeUntil(this.componentIsDestroyed$)).subscribe(
      (category: Category) => {
        this.category = category;
        this.categoryForm.patchValue(category);
      }
    );
  }

  addCategory() {
    if(this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).pipe(takeUntil(this.componentIsDestroyed$)).subscribe(
        () => {
          this.reloadCategories$.next(true);
        }
      );
      this.openSnackBar('saved successfully');
      this.categoryForm.reset();
    }else {
      this.openSnackBar('form is not valid', 'snackbar-error');
    }
  }

  updateCategory(id: string) {
    if(this.categoryForm.valid) {
      this.categoryService.updateCategory(id, this.categoryForm.value)
        .pipe(takeUntil(this.componentIsDestroyed$)).subscribe(
        () => {
          this.reloadCategories$.next(true);
        }
      );
      this.openSnackBar('saved successfully');
      this.categoryForm.reset();
    }else {
      this.openSnackBar('field should not be empty', 'snackbar-error');
    }
  }

  deleteCategory(id: string) {
    if(id) {
      this.categoryService.deleteCategory(id).pipe(takeUntil(this.componentIsDestroyed$)).subscribe(
        () => {
          this.reloadCategories$.next(true);
        }
      );
      this.openSnackBar('deleted successfully');
    }
    else{
      this.openSnackBar('cannot delete', 'snackbar-error');

    }
  }

  openSnackBar(message: string = '', className: string = 'snackbar-success') {
    this._snackBar.open(
      message,
      'Close', {
        duration: 5000,
        panelClass: [className]
      });
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  private reloadCategories(): void {
    this.reloadCategories$.next(true);
  }
}
