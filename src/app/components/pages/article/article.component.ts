import { Component, OnInit } from '@angular/core';
import { BrandResponse } from '../../../core/models/brand.model';
import { Pagination } from '../../../core/models/pagination.model';
import { BrandService } from '../../../core/services/brand.service';
import { PaginationParams } from '../../../shared/interfaces/PaginationParams';
import { ASC, NAME } from '../../../shared/utils/constants/atoms-constants';
import { Option } from 'src/app/shared/interfaces/Option';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryResponse } from 'src/app/core/models/category.model';
import { ArticleRequest } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service';
import { CREATE_ARTICLE } from 'src/app/shared/utils/constants/pages-constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  title = CREATE_ARTICLE;
  brands: Option[] = [];
  categories: Option[] = [];
  constructor(public brandService: BrandService, public categoryService: CategoryService, public articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
  }

  loadCategories(): void {
    const params: PaginationParams = {
      page: 0,
      size: 9999,
      sortDirection: ASC,
      sortBy: NAME
    };

    this.categoryService.listAll(params).subscribe((pagination: Pagination) => {
      const categories: CategoryResponse[] = pagination.content;

      this.categories = categories.map(category => ({
        value: category.id,
        label: category.name
      }));
    });
  }

  loadBrands(): void {
    const params: PaginationParams = {
      page: 0,
      size: 9999,
      sortDirection: ASC,
      sortBy: NAME
    };

    this.brandService.listAll(params).subscribe((pagination: Pagination) => {
      const brandResponses: BrandResponse[] = pagination.content;

      this.brands = brandResponses.map(brand => ({
        value: brand.id,
        label: brand.name
      }));
    });
  }

  handleSubmit(entityData: ArticleRequest) {
    this.articleService.create(entityData).subscribe({
      next: (success: boolean) => {
        if (success) {
        }
      }
    });
  }
}
