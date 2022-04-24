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

  addSubscription(accountId: string, subscription: Subscriptions): Observable<Subscriptions> {
    return this.http.post<Subscriptions>(`${environment.apiUrl}subscriptions/${accountId}`, subscription);
  }


  getSubscriptions(accountId: string, search?: string): Observable<Subscriptions[]> {
    return this.http.get<Subscriptions[]>(
      `${environment.apiUrl}subscriptions/${accountId}/find?search=${search}`
    );
  }

  getSubscription(accountId: string, id: string): Observable<Subscriptions> {
    return this.http.get<Subscriptions>(
      `${environment.apiUrl}subscriptions/${accountId}/${id}`
    );
  }

  updateSubscription(id: string, transaction: Subscriptions): Observable<Subscriptions> {
    return this.http.put<Subscriptions>(
      `${environment.apiUrl}subscriptions/${id}`,
      transaction
    );
  }

  deleteSubscription(id: string) {
    return this.http.delete(`${environment.apiUrl}subscriptions/${id}`);
  }
}
