import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  get id(): any {
    console.log(this.route.snapshot.paramMap.get('id'));
    return this.route.snapshot.paramMap.get('id');
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  getAccounts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}accounts`);
  }

  getAccountById(id: string) {
    return this.http.get(`${environment.apiUrl}accounts/${id}`);
  }

  addAccount(account: any) {
    return this.http.post(`${environment.apiUrl}accounts`, account);
  }

}
