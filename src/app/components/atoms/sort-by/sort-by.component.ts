import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Option } from "../../../shared/interfaces/Option";
import { ASC, NAME, ORDER_BY, SORT_ASC_NAME, SORT_DESC_NAME } from '../../../shared/utils/constants/atoms-constants';
import { SortEvent } from 'src/app/shared/interfaces/SortEvent';
@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {
  sortOptions: Option[] = [
    { label: NAME, value: SORT_ASC_NAME },
    { label: NAME, value: SORT_DESC_NAME },
  ];

  asc = ASC;
  order_by = ORDER_BY;
  @Output() sortChange = new EventEmitter<SortEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const [direction, property] = selectElement.value.split(',');

    const sortEvent: SortEvent = {
      direction,
      property
    };
    this.sortChange.emit(sortEvent);
  }
}
