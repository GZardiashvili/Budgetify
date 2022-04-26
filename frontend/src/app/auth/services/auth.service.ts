import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private utilsService: UtilsService) {
  }

  login(email: string, password: string) {
    return this.http
      .post(new URL('login', environment.apiUrl).toString(), {
        email,
        password,
      })
      .pipe(
        tap((res: any) => {
          this.utilsService.fillStorage(res);
        })
      );
  }

  logout() {
    this.router.navigate(['/login']);
    return this.utilsService.clearStorage();
  }

  isAuthenticated() {
    return this.utilsService.isAuthenticated();
  }

  getToken() {
    return this.utilsService.getToken();
  }
}
