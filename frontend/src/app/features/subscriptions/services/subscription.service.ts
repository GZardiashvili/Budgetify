import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Subscriptions } from '../subscriptions';
import { Observable } from 'rxjs';

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

  getSubscription(accountId: string, id: string): Observable<Subscriptions> {
    return this.http.get<Subscriptions>(
      `${environment.apiUrl}subscriptions/${accountId}/${id}`
    );
  }

  updateSubscription(id: string, transaction: Subscriptions): Observable<Subscriptions> {
    return this.http.put<Subscriptions>(
      `${environment.apiUrl}subscriptions/update/${id}`,
      transaction
    );
  }

  deleteSubscription(id: string) {
    return this.http.delete(`${environment.apiUrl}subscriptions/delete/${id}`);
  }
}
