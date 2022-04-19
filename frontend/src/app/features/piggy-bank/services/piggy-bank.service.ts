import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PiggyBank } from '../piggy-bank';
import { Transaction } from '../../main-page/transaction/transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiggyBankService {

  constructor(private http: HttpClient) {
  }

  getPiggyBanks(accountId: string | null) {
    return this.http.get<PiggyBank[]>(`${environment.apiUrl}piggyBanks/${accountId}`);
  }

  getPiggyBank(accountId: string | null, id: string) {
    return this.http.get<PiggyBank>(`${environment.apiUrl}piggyBanks/${accountId}/${id}`);
  }

  updatePiggyBank(id: string, piggyBank: PiggyBank): Observable<PiggyBank> {
    return this.http.put<PiggyBank>(
      `${environment.apiUrl}piggyBanks/update/${id}`,
      piggyBank
    );
  }

  deletePiggyBank(id: string) {
    return this.http.delete(`${environment.apiUrl}piggyBanks/delete/${id}`);
  }
}
