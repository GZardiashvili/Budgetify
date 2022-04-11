import { Component } from '@angular/core';
import { UtilsService } from '../../shared/utils/utils.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private utilsService: UtilsService) {
  }

  get accountId(): string | null {
    return this.utilsService.accountId
  }

}
