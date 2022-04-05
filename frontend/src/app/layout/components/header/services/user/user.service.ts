import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  id = localStorage.getItem('userId');

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get<User>(`${environment.apiUrl}users/${this.id}`);
  }
}
