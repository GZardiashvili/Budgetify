import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Category } from './category';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleArrowDown, faCircleArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { CommonService } from '../../shared/common/common.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadCategories$ = new BehaviorSubject(true);
  faEdit: IconProp = faEdit;
  faXMark: IconProp = faXmark;
  faExpense = faCircleArrowUp;
  faIncome = faCircleArrowDown
  categories$: Observable<Category[]> = this.categoryService.getCategories();
  categoryForm = this.fb.group({
    title: [''],
    type: [''],
  })

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private commonService: CommonService) {
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

  getCategory(id: string) {
    console.log(id)
  }

  updateCategory(id: string, category: Category) {
    console.log(id, category);
  }

  deleteCategory(id: string) {
    console.log('id', id);
  }


  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  private reloadCategories(): void {
    this.reloadCategories$.next(true);
  }
}
