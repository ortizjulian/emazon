import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TOTAL_PAGES_TO_SHOW } from '../../../shared/utils/constants/atoms-constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  constructor() { }

  pagesToShow: number[] = [];

  ngOnInit(): void {
    this.setPagesToShow();
  }

  setPagesToShow(): void {
    const totalPagesToShow = TOTAL_PAGES_TO_SHOW;

    let start = Math.max(1, this.currentPage - Math.floor(totalPagesToShow / 2));
    let end = start + totalPagesToShow - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - totalPagesToShow + 1);
    }

    this.pagesToShow = Array.from({ length: TOTAL_PAGES_TO_SHOW }, (_, i) => start + i);
  }


  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
      this.setPagesToShow();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }
}
