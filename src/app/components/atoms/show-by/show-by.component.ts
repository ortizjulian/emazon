import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Option } from '../../../shared/interfaces/Option';
import { SHOW_BY } from '../../../shared/utils/constants/atoms-constants';

@Component({
  selector: 'app-show-by',
  templateUrl: './show-by.component.html',
  styleUrls: ['./show-by.component.scss']
})
export class ShowByComponent implements OnInit {

  showOptions: Option[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
  ];

  show_by = SHOW_BY;

  @Output() showChange = new EventEmitter<{ value: number }>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = parseInt(selectElement.value, 10);

    this.showChange.emit({ value: selectedValue });
  }
}
