import {Component, OnInit} from '@angular/core';
import {
  faBoxesStacked, faCirclePlus,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import {IMenuItem} from "./imenu-item";
import {MENU_CONFIG} from "./menu.config";
import {AccountService} from "./accounts/account.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: IMenuItem[] = MENU_CONFIG;
  accounts: any = this.accountService.getAccounts()

  faDetails = faEllipsis
  faAccounts = faBoxesStacked
  faAdd = faCirclePlus

  constructor(private accountService: AccountService) {

  }

  trackBy(index: number, item: IMenuItem): string {
    return item.id;
  }


  ngOnInit(): void {

  }

}
