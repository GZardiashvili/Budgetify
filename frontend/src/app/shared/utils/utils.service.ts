import { Injectable } from '@angular/core';
import { Transaction } from '../../features/main-page/transaction/transaction';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {
  }

  setAccountId(id: string | null) {
    localStorage.setItem('accountId', String(id));
  }

  get accountId(): string | null {
    if (localStorage.getItem('accountId')) {
      return localStorage.getItem('accountId');
    }
    return '';
  }

  clearStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  fillStorage(res: any) {
    localStorage.setItem('token', res['token']);
    localStorage.setItem('role', res['role']);
    localStorage.setItem('userId', res['id']);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
