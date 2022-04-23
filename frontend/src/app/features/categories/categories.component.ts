import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Category } from './category';
import { Observable } from 'rxjs';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleArrowDown, faCircleArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  faEdit: IconProp = faEdit;
  faXMark: IconProp = faXmark;
  faExpense = faCircleArrowUp;
  faIncome = faCircleArrowDown
  categories: Observable<Category[]> = this.categoryService.getCategories();
  categoryForm = this.fb.group({
    title: [''],
    type: [''],
  })

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  delete() {
    console.log('delete');
  }
}
