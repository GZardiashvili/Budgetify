import {Component} from '@angular/core';
import {AuthService} from "./auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Budgetify';

  constructor(private authService: AuthService) {
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
