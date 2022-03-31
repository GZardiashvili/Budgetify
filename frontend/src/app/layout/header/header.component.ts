import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoggedIn!: boolean;
  @Output() menuButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() loggedOutClicked: EventEmitter<void> = new EventEmitter<void>();

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
