import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Subscriptions} from "../subscriptions";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) {
  }

  getSubscriptions() {
    return this.http.get<Subscriptions[]>(`${environment.apiUrl}subscriptions`);

  }
}
