import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  createCategory(category: Category) {
    return this.http.post(`${environment.apiUrl}/categories/create`, category);
  }

  getCategories(search?: string) {
    return this.http.get<Category[]>(`${environment.apiUrl}categories/find?search=${search}`);
  }

  updateCategory(id: string, category: Category) {
    return this.http.put(`${environment.apiUrl}/categories/update/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.apiUrl}categories/delete/${id}`);
  }
}
