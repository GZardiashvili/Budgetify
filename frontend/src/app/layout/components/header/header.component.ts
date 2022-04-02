import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  profile: any = {
    name: 'Giorgi Zardiashvili',
    pfpUrl: '',
    account: {
      label: 'Account settings',
      url: '',
    },
    display: {
      label: 'Display settings',
      url: '',
    },
    logout: 'Log out',
  }


  constructor(private authService: AuthService, private router: Router) {
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then();
  }
}
