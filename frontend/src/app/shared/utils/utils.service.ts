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

  translateForStatistic(transactions: any[]) {
    const incomes = transactions.filter((el) => el.type === 'incomes');
    const expenses = transactions.filter((el) => el.type === 'expenses');
    const pos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const neg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const incomesSum = incomes.reduce((acc, el) => {
      switch (new Date(el.dateOfOperation).getMonth() + 1) {
        case 1:
          pos[0] += el.amount;
          break;
        case 2:
          pos[1] += el.amount;
          break;
        case 3:
          pos[2] += el.amount;
          break;
        case 4:
          pos[3] += el.amount;
          break;
        case 5:
          pos[4] += el.amount;
          break;
        case 6:
          pos[5] += el.amount;
          break;
        case 7:
          pos[6] += el.amount;
          break;
        case 8:
          pos[7] += el.amount;
          break;
        case 9:
          pos[8] += el.amount;
          break;
        case 10:
          pos[9] += el.amount;
          break;
        case 11:
          pos[10] += el.amount;
          break;
        default:
          pos[11] += el.amount;
          break;
      }
    }, 0);
    const expensesSum = expenses.reduce((acc, el) => {
      switch (new Date(el.dateOfOperation).getMonth() + 1) {
        case 1:
          neg[0] += el.amount;
          break;
        case 2:
          neg[1] += el.amount;
          break;
        case 3:
          neg[2] += el.amount;
          break;
        case 4:
          neg[3] += el.amount;
          break;
        case 5:
          neg[4] += el.amount;
          break;
        case 6:
          neg[5] += el.amount;
          break;
        case 7:
          neg[6] += el.amount;
          break;
        case 8:
          neg[7] += el.amount;
          break;
        case 9:
          neg[8] += el.amount;
          break;
        case 10:
          neg[9] += el.amount;
          break;
        case 11:
          neg[10] += el.amount;
          break;
        default:
          neg[11] += el.amount;
          break;
      }
    }, 0);
    const economySum = pos.map((el, i) => el - neg[i]);
    return {
      incomes: incomesSum,
      expenses: expensesSum,
      economy: economySum,
      pos,
      neg,
    };
  }
}
