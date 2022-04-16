import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from './card';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Input() icon!: IconProp;

  constructor() {
  }

  ngOnInit(): void {
  }

}
