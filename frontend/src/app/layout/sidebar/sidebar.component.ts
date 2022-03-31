import {Component, OnInit} from '@angular/core';
import {IMenuItem} from "./imenu-item";
import {MENU_CONFIG} from "./menu.config";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: IMenuItem[] = MENU_CONFIG;

  constructor() {
  }

  trackBy(index: number, item: IMenuItem): string {
    return item.id;
  }


  ngOnInit(): void {
  }

}