import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../main-page/transaction/transaction';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {
  }

  getTransactions(accountId: string | null) {
    return this.http.get<Transaction[]>(
      `${environment.apiUrl}transactions/${accountId}`
    );
  }
}
