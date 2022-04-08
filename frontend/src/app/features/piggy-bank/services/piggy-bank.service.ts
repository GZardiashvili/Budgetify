import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PiggyBank } from '../piggy-bank';

@Injectable({
  providedIn: 'root'
})
export class PiggyBankService {

  constructor(private http: HttpClient) {
  }

  getPiggyBank() {
    return this.http.get<PiggyBank>(`${environment.apiUrl}piggy-bank`);
  }
}
