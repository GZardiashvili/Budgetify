import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingArr: string[] = [];

  constructor() {
  }

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }
    if (loading === true) {
      this.loadingArr.push(url);
      this.loading$.next(true);
    } else if (loading === false && this.loadingArr.length > 0) {
      this.loadingArr = this.loadingArr.filter(item => item !== url);
    }
    if (this.loadingArr.length === 0) {
      this.loading$.next(false);
    }
  }
}
