import { Component } from '@angular/core';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { PiggyBankService } from './services/piggy-bank.service';
import { PiggyBank } from './piggy-bank';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-piggy-bank',
  templateUrl: './piggy-bank.component.html',
  styleUrls: ['./piggy-bank.component.scss'],
})
export class PiggyBankComponent {
  faPiggyBank = faPiggyBank;
  piggyBanks: Observable<PiggyBank[]> = this.piggyBankService.getPiggyBanks();
  piggyBank: Observable<PiggyBank> = this.piggyBankService.getPiggyBank('6251e8ca8805a546c33a4308');
  piggyBankForm = this.fb.group({
    goal: [''],
    goalAmount: [''],
    description: [''],
    savings: [''],
    crashDate: [''],
  });

  constructor(private fb: FormBuilder, private piggyBankService: PiggyBankService) {
  }
}
