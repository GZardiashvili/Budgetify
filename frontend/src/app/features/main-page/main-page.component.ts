import { Component } from '@angular/core';
import { UtilsService } from '../../shared/utils/utils.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  faArrowLeft: IconProp = faArrowLeftLong;

  constructor(private utilsService: UtilsService) {
  }

  get accountId(): string | null {
    return this.utilsService.accountId
  }

}
