import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Account } from '../account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}accounts`);
  }

  getAccount(accountId: string | null): Observable<Account> {
    return this.http.get<Account>(`${environment.apiUrl}accounts/${accountId}`);
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.apiUrl}accounts/create`, account);
  }
}
