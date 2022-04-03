import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  id = localStorage.getItem('userId');

  constructor(private http: HttpClient) {
  }

  getUserProfile() {
    return this.http.get(`${environment.apiUrl}users/${this.id}`);
  }
}
