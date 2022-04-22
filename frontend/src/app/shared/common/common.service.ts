import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private shareBalance$ = new BehaviorSubject<number>(0);
  private searchTerm$ = new BehaviorSubject<string>('');

  sendUpdate(message: number) {
    this.shareBalance$.next(message);
  }

  getUpdate(): Observable<number> {
    return this.shareBalance$.asObservable();
  }

  sendSearchTerm(message: string) {
    this.searchTerm$.next(message);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  constructor() {
  }
}
