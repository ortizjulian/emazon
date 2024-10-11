import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { CREATE_CATEGORY } from '../../../shared/utils/constants/pages-constants';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  title = CREATE_CATEGORY;

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  handleSubmit(entityData: Category) {
    this.categoryService.create(entityData).subscribe({
      next: (success: boolean) => {
        if (success) {
          //Lo que voy a hacer cuando se crea la categoría
        }
      }
    });
  }
}
