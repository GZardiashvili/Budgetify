import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../../shared/common/common.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // @Input() search = this.searchControl.valueChanges.pipe(delay(500));
  searchControl: FormControl = new FormControl('');

  constructor(private commonService: CommonService) {
    this.searchControl.valueChanges.subscribe(term => {
      this.commonService.sendSearchTerm(term)
    });
  }


  ngOnInit(): void {
  }

}
