import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Obligatory} from "../obligatory";

@Injectable({
  providedIn: 'root'
})
export class ObligatoryService {

  constructor(private http: HttpClient) {
  }

  getObligates() {
    return this.http.get<Obligatory[]>(`${environment.apiUrl}obligatoryPayments`);
  }
}
