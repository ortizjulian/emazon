import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SortEvent } from 'src/app/shared/interfaces/SortEvent';

@Component({
  selector: 'app-advanced-table',
  templateUrl: './advanced-table.component.html',
  styleUrls: ['./advanced-table.component.scss']
})
export class AdvancedTableComponent implements OnInit {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 0;
  @Input() currentSize: number = 0;
  @Input() data: any[] = [];
  @Input() columns: Array<{ header: string; field: string }> = [];
  @Output() pageChange = new EventEmitter<number>();
  @Output() showChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<SortEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
  onShowChange(size: number): void {
    this.showChange.emit(size);
  }
  onSortChange(sortEvent: SortEvent): void {
    this.sortChange.emit(sortEvent);
  }

}
