import { Component } from '@angular/core';
import { PiggyBankService } from './services/piggy-bank.service';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrls: ['./piggy-bank.component.scss'],
})
export class PiggyBankComponent {
  constructor(private piggyBankService: PiggyBankService) {
  }

}
