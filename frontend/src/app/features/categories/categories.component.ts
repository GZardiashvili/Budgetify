import {Component, OnInit} from "@angular/core";
import {CategoryService} from "./services/category.service";
import {Category} from "./category";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Observable<Category[]> = this.categoryService.getCategories()

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }

}
