import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import { LoadingService } from '../shared/loading/services/loading.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  loading!: Observable<boolean>
  @Output() add = new EventEmitter();

  constructor(private loadingService: LoadingService) {
    this.loading = this.loadingService.loading$.pipe(delay(0)) // delay(0) to avoid ExpressionChangedAfterItHasBeenCheckedError
  }

  ngOnInit() {
  }
}
