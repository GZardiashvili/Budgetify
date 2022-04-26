import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../account";
import {environment} from "../../../../../../environments/environment";
import {Currency} from "../currency";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${environment.apiUrl}currencies/`);
  }
  getCurrency(id: string): Observable<Currency> {
    return this.http.get<Currency>(`${environment.apiUrl}currencies/${id}`);
  }

}
