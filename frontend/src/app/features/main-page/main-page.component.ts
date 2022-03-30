import {Component} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }


}
