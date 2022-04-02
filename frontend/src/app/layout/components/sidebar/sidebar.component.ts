import {Component, OnInit} from '@angular/core';
import {
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import {IMenuItem} from "./imenu-item";
import {MENU_CONFIG} from "./menu.config";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: IMenuItem[] = MENU_CONFIG;
  accounts = [
    {
      name: 'Accounts',
      icon: 'fa fa-user-circle-o',
      link: 'accounts'
    },
    {
      name: 'Add Account',
      icon: 'fa fa-user-plus',
      link: 'add-account'
    },
    {
      name: 'Edit Account',
      icon: 'fa fa-user-edit',
      link: 'edit-account'
    },
    {
      name: 'Delete Account',
      icon: 'fa fa-user-times',
      link: 'delete-account'
    },
    {
      name: 'View Account',
      icon: 'fa fa-user-circle-o',
      link: 'view-account'
    }
  ]

  faDetails = faEllipsis

  constructor() {
  }

  trackBy(index: number, item: IMenuItem): string {
    return item.id;
  }


  ngOnInit(): void {
  }

}
