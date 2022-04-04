import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Transaction} from "../transaction";
import {AccountService} from "../../../../layout/components/sidebar/accounts/account.service";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private accountService: AccountService) {
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}transactions`);
  }
}
