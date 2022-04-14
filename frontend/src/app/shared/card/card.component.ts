import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() icon!: any;
  @Output() onClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
