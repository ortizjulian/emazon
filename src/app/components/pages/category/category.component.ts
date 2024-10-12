import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { CREATE_CATEGORY, INITIAL_ITEMS_TABLE, NAME, DESCRIPTION, DESCRIPTION_CONTROL, NAME_CONTROL } from '../../../shared/utils/constants/pages-constants';
import { CategoryRequest, CategoryResponse } from 'src/app/core/models/category.model';
import { PaginationParams } from '../../../shared/interfaces/PaginationParams';
import { Pagination } from '../../../core/models/pagination.model';
import { SortEvent } from '../../../shared/interfaces/SortEvent';
import { ASC } from '../../../shared/utils/constants/atoms-constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  title = CREATE_CATEGORY;
  totalPages: number = 0;
  currentPage: number = 1;
  categories: CategoryResponse[] = [];
  currentSize: number = INITIAL_ITEMS_TABLE;
  sortDirection: string = ASC;
  sortBy: string = NAME_CONTROL;

  columns: Array<{ header: string, field: string }> = [
    { header: NAME, field: NAME_CONTROL },
    { header: DESCRIPTION, field: DESCRIPTION_CONTROL },
  ];

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCategories();
  }

  onShowChange(size: number): void {
    this.currentPage = 1;
    this.currentSize = size;
    this.loadCategories();
  }

  onSortChange(sortEvent: SortEvent): void {
    this.sortDirection = sortEvent.direction;
    this.sortBy = sortEvent.property;
    this.loadCategories();
  }

  handleSubmit(entityData: CategoryRequest) {
    this.categoryService.create(entityData).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.loadCategories();
        }
      }
    });
  }

  loadCategories(): void {
    const params: PaginationParams = {
      page: this.currentPage - 1,
      size: this.currentSize,
      sortDirection: this.sortDirection,
      sortBy: this.sortBy
    };

    this.categoryService.listAll(params).subscribe((pagination: Pagination) => {
      this.categories = pagination.content;
      this.totalPages = pagination.totalPages;
    });
  }
}
