import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  getAccounts() {
    return this.http.get(`${environment.apiUrl}accounts`);
  }

  getAccountById(id: string) {
    return this.http.get(`${environment.apiUrl}accounts/${id}`);
  }

  addAccount(account: any) {
    return this.http.post(`${environment.apiUrl}accounts`, account);
  }
}
