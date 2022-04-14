import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscriptions } from '../subscriptions';
import { Observable } from 'rxjs';
import { Transaction } from '../../main-page/transaction/transaction';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {
  }

  getSubscriptions(accountId: string) {
    return this.http.get<Subscriptions[]>(
      `${environment.apiUrl}subscriptions/${accountId}`
    );
  }

  getSubscription(accountId: string, id: string): Observable<Transaction> {
    return this.http.get<Transaction>(
      `${environment.apiUrl}subscriptions/${accountId}/${id}`
    );
  }
}
