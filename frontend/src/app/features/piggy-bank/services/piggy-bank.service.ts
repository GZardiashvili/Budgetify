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

// must change when binding-with-account is implemented
  getPiggyBanks() {
    return this.http.get<PiggyBank[]>(`${environment.apiUrl}piggyBanks/6248c4feb08520e2a903fc3a`);
  }
}
