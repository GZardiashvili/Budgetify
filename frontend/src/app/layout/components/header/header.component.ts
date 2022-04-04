import {Component, OnDestroy} from "@angular/core";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "./services/user/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  user: any;

  profile: any = {
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
  }

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    this.userService.getUserProfile().subscribe(user => {
      this.user = user
      this.profile.name = this.user.firstName + ' ' + this.user.lastName
      this.profile.pfpUrl = this.user.pfpUrl == '' ? this.user.pfpUrl : '../../assets/default-pfp.png'
      this.profile.account.url = '/account'
      this.profile.display.url = '/display'
    })
  }

  ngOnDestroy() {
    this.user.unsubscribe()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
