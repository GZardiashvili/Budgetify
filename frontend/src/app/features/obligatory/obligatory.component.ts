import {Component, OnInit} from '@angular/core';
import {ObligatoryService} from "./services/obligatory.service";

@Component({
  selector: 'app-obligatory',
  templateUrl: './obligatory.component.html',
  styleUrls: ['./obligatory.component.scss']
})
export class ObligatoryComponent implements OnInit {
  obligates: any = this.obligatoryService.getObligates();

  constructor(private obligatoryService: ObligatoryService) {
  }


  ngOnInit(): void {
  }

}
