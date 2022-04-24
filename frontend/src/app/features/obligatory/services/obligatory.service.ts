import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Obligatory } from '../obligatory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObligatoryService {
  constructor(private http: HttpClient) {
  }

  addObligatory(accountId: string, obligatory: Obligatory): Observable<any> {
    return this.http.post(`${environment.apiUrl}obligatoryPayments/create/${accountId}`, obligatory);
  }

  getObligates(accountId: string, search?: string): Observable<Obligatory[]> {
    return this.http.get<Obligatory[]>(
      `${environment.apiUrl}obligatoryPayments/${accountId}/find?search=${search}`
    );
  }

  getObligate(accountId: string, id: string): Observable<Obligatory> {
    return this.http.get<Obligatory>(
      `${environment.apiUrl}obligatoryPayments/${accountId}/${id}`
    );
  }

  updateObligate(id: string, obligate: Obligatory): Observable<Obligatory> {
    return this.http.put<Obligatory>(
      `${environment.apiUrl}obligatoryPayments/update/${id}`,
      obligate
    );
  }

  deleteObligate(id: string) {
    return this.http.delete(`${environment.apiUrl}obligatoryPayments/delete/${id}`);
  }
}
