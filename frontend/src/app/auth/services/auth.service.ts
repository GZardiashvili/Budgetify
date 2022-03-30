import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}login`, {email, password}).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res['token']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
