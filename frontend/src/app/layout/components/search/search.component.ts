import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../../shared/common/common.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch: IconProp = faSearch;
  searchControl: FormControl = new FormControl('');

  constructor(private commonService: CommonService) {
    this.searchControl.valueChanges.subscribe(term => {
      this.commonService.sendSearchTerm(term)
    });
  }


  ngOnInit(): void {
  }

}
