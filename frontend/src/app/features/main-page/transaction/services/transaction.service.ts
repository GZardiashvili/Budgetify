import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Transaction} from '../transaction';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getTransactions(accountId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}transactions/${accountId}`);
  }
}
