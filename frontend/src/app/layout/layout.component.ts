import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { LoadingService } from '../shared/loading/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  loading!: Observable<boolean>

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loading = this.loadingService.loading$
  }
}
