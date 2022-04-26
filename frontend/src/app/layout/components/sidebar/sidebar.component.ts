import {Component} from '@angular/core';
import {IMenuItem} from './imenu-item';
import {MENU_CONFIG} from './menu.config';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {UtilsService} from "../../../shared/utils/utils.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menu: IMenuItem[] = MENU_CONFIG;
  currentRoute: string = '/';
  enableSidebar: boolean=false;

  constructor(private router: Router) {
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });

  }

  trackBy(index: number, item: IMenuItem): string {
    return item.id;
  }
  isEnabled($event:any){
    this.enableSidebar=$event;
  }
}
