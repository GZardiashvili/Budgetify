import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from './services/subscription.service';
import { Observable } from 'rxjs';
import { Subscriptions } from './subscriptions';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilsService } from '../../shared/utils/utils.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent implements OnInit {
  subscriptions$!: Observable<Subscriptions[]>;

  constructor(
    private subscriptionService: SubscriptionService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('accountId') ? params.get('accountId') : this.utilsService.accountId;
          return this.subscriptionService.getSubscriptions(String(id));
        })
      );
  }
}
