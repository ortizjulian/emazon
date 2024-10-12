import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SortEvent } from 'src/app/shared/interfaces/SortEvent';

@Component({
  selector: 'name-desc-form-table',
  templateUrl: './name-desc-form-table.component.html',
  styleUrls: ['./name-desc-form-table.component.scss']
})
export class NameDescFormTableComponent implements OnInit {

  @Output() submitForm = new EventEmitter<any>();
  @Input() successMessage: string = '';
  @Input() errorMessage: string = '';
  @Input() title: string = ''
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

  handleSubmit(entityData: any) {
    this.submitForm.emit(entityData);
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
