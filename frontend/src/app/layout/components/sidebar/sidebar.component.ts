import {Component, OnInit} from '@angular/core';
import {
  faBoxesStacked,
  faCirclePlus,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import {IMenuItem} from './imenu-item';
import {MENU_CONFIG} from './menu.config';
import {AccountService} from './accounts/account.service';
import {Observable} from 'rxjs';
import {Account} from './accounts/account';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menu: IMenuItem[] = MENU_CONFIG;
  accounts: Observable<Account[]> = this.accountService.getAccounts();

  faDetails = faEllipsis;
  faAccounts = faBoxesStacked;
  faAdd = faCirclePlus;

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) {

  }

  trackBy(index: number, item: IMenuItem): string {
    return item.id;
  }

  addAccount(account: Account) {
    this.accountService.addAccount(account);
  }

  setAccountId(id: string) {
    localStorage.setItem('accountId', id);
  }

  get getAccountId() {
    return localStorage.getItem('accountId');
  }

  get url() {
    return this.router.url.split('/')[0] + '/' + this.router.url.split('/')[1];
  }

  ngOnInit(): void {
  }
}
