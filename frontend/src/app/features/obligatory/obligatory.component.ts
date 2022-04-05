import { Component, OnInit } from '@angular/core';
import { ObligatoryService } from './services/obligatory.service';
import { Observable } from 'rxjs';
import { Obligatory } from './obligatory';

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss'],
})
export class ObligatoryComponent implements OnInit {
  obligates: Observable<Obligatory[]> = this.obligatoryService.getObligates();

  constructor(private obligatoryService: ObligatoryService) {}

  ngOnInit(): void {}
}
