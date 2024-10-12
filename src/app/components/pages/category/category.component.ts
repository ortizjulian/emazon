import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { CREATE_CATEGORY } from '../../../shared/utils/constants/pages-constants';
import { CategoryRequest, CategoryResponse } from 'src/app/core/models/category.model';
import { PaginationParams } from 'src/app/shared/interfaces/PaginationParams';
import { Pagination } from 'src/app/core/models/pagination.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  title = CREATE_CATEGORY;
  totalPages: number = 1800;
  currentPage: number = 0;
  categories: CategoryResponse[] = [];

  columns: Array<{ header: string, field: string }> = [
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' },
  ];

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log(`Página actual: ${this.currentPage}`);
  }
  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  handleSubmit(entityData: CategoryRequest) {
    this.categoryService.create(entityData).subscribe({
      next: (success: boolean) => {
        if (success) {
        }
      }
    });
  }

  loadCategories(): void {
    const params: PaginationParams = {
      page: this.currentPage,
      size: 5,
      sortDirection: "ASC",
      sortBy: "name"
    };

    this.categoryService.listAll(params).subscribe((pagination: Pagination) => {
      this.categories = pagination.content;
      this.totalPages = pagination.totalPages;
    });
  }
}
