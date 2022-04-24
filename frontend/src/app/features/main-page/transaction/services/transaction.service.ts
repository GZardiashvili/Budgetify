import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Transaction } from '../transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  addTransaction(accountId: string, transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(
      `${environment.apiUrl}transactions/${accountId}`,
      transaction
    );
  }

  getTransactions(accountId: string, search?: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${environment.apiUrl}transactions/${accountId}/find?search=${search}`
    );
  }

  getTransaction(accountId: string, id: string): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${environment.apiUrl}transactions/${accountId}/${id}`
    );
  }

  updateTransaction(id: string, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${environment.apiUrl}transactions/${id}`,
      transaction
    );
  }

  deleteTransaction(id: string) {
    return this.http.delete(`${environment.apiUrl}transactions/${id}`);
  }

}
