import { Component } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { PiggyBankService } from './services/piggy-bank.service';
import { PiggyBank } from './piggy-bank';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrls: ['./piggy-bank.component.scss'],
})
export class PiggyBankComponent {
  faPiggyBank = faPiggyBank;
  piggyBanks: Observable<PiggyBank[]> = this.piggyBankService.getPiggyBanks();

  constructor(private piggyBankService: PiggyBankService) {
  }

}
