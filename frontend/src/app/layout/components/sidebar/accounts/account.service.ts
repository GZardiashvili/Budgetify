import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Account} from './account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}accounts`);
  }

  getAccountById(id: string) {
    return this.http.get<Account>(`${environment.apiUrl}accounts/${id}`);
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.apiUrl}accounts`, account);
  }
}
