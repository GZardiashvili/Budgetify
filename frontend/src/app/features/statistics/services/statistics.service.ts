import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Statistics} from "../statistics";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {
  }

  getStatistics(accountId: string) {
    return this.http.get<Statistics>(`${environment.apiUrl}statistics/${accountId}`);
  }

}
