import { Component, OnInit } from '@angular/core';
import { CREATE_BRAND, DESCRIPTION, DESCRIPTION_CONTROL, INITIAL_ITEMS_TABLE, NAME, NAME_CONTROL } from '../../../shared/utils/constants/pages-constants';
import { ASC } from '../../../shared/utils/constants/atoms-constants';
import { BrandReponse, BrandRequest } from '../../../core/models/brand.model';
import { SortEvent } from '../../../shared/interfaces/SortEvent';
import { Pagination } from '../../../core/models/pagination.model';
import { PaginationParams } from '../../../shared/interfaces/PaginationParams';
import { BrandService } from 'src/app/core/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  title = CREATE_BRAND;
  totalPages: number = 0;
  currentPage: number = 1;
  brands: BrandReponse[] = [];
  currentSize: number = INITIAL_ITEMS_TABLE;
  sortDirection: string = ASC;
  sortBy: string = NAME_CONTROL;

  columns: Array<{ header: string, field: string }> = [
    { header: NAME, field: NAME_CONTROL },
    { header: DESCRIPTION, field: DESCRIPTION_CONTROL },
  ];

  constructor(public brandService: BrandService) { }

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

  handleSubmit(entityData: BrandRequest) {
    this.brandService.create(entityData).subscribe({
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

    this.brandService.listAll(params).subscribe((pagination: Pagination) => {
      this.brands = pagination.content;
      this.totalPages = pagination.totalPages;
    });
  }

}
