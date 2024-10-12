import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SHOW_BY, SHOW_OPTIONS } from '../../../shared/utils/constants/atoms-constants';
import { INITIAL_ITEMS_TABLE } from '../../../shared/utils/constants/pages-constants';

@Component({
  selector: 'app-show-by',
  templateUrl: './show-by.component.html',
  styleUrls: ['./show-by.component.scss']
})
export class ShowByComponent implements OnInit {

  @Input() currentSize: number = INITIAL_ITEMS_TABLE;

  showOptions = SHOW_OPTIONS;
  show_by = SHOW_BY;

  @Output() showChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = parseInt(selectElement.value, 10);

    this.showChange.emit(selectedValue);
  }
}
