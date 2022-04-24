import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  createCategory(category: Category) {
    return this.http.post(`${environment.apiUrl}categories`, category);
  }

  getCategories(search?: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}categories/find?search=${search}`);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(
      `${environment.apiUrl}categories/${id}`
    );
  }

  updateCategory(id: string, category: Category) {
    return this.http.put(`${environment.apiUrl}categories/${id}`, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${environment.apiUrl}categories/${id}`);
  }
}
