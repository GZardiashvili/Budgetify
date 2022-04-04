import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from "./services/subscription.service";
import {Observable} from "rxjs";
import {Subscriptions} from "./subscriptions";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: Observable<Subscriptions[]> = this.subscriptionService.getSubscriptions()

  constructor(private subscriptionService: SubscriptionService) {
  }

  ngOnInit(): void {
  }

}
