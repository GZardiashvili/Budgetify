import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {UserService} from './services/user/user.service';
import {Profile} from './models/profile';
import {User} from './models/user';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  user: Observable<User> = this.userService.getUserProfile();

  profile: Profile = {
    name: '',
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
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.user.pipe(takeUntil(this.componentIsDestroyed$)).subscribe((user) => {
      this.profile.name = user.firstName + ' ' + user.lastName;
      this.profile.pfpUrl =
        user.pfpUrl == '' ? user.pfpUrl : '../../assets/default-pfp.png';
      this.profile.account.url = '/account';
      this.profile.display.url = '/display';
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
