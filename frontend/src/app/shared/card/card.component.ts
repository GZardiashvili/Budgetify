import { Component, Input, OnInit } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() icon!: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
