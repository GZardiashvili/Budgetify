import { Component } from '@angular/core';
import { IMenuItem } from './imenu-item';
import { MENU_CONFIG } from './menu.config';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menu: IMenuItem[] = MENU_CONFIG;
  currentRoute: string = '/';

  constructor(private router: Router) {
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }

  trackBy(index: number, item: IMenuItem): string {
    return item.id;
  }
}
