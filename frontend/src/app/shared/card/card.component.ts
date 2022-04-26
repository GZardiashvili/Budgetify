import { Component, Input, OnInit } from '@angular/core';
import { Card } from './card';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card!: Card;
  @Input() icon!: IconProp;

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    let today = new Date();
    // @ts-ignore
    let diff = Math.abs(new Date(this.card?.dateOfPayment) - today);
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays <= 3) {
      this.openSnackBar()
    }
  }
  openSnackBar() {
    this._snackBar.open(
      'less than 3 days left before payment',
      'OK', {
        panelClass: ['snackbar-warn']
      });
  }
}
