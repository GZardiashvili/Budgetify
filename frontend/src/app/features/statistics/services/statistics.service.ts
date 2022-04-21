import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {
  }

  getStatistics(accountId: string | null) {
    return this.http.get<any>(
      `${environment.apiUrl}statistics/${accountId}`
    );
  }
}
