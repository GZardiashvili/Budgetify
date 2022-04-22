import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private shareBalance$ = new BehaviorSubject<number>(0);

  sendUpdate(message: number) {
    this.shareBalance$.next(message);
  }

  getUpdate(): Observable<number> {
    return this.shareBalance$.asObservable();
  }

  constructor() {
  }
}
