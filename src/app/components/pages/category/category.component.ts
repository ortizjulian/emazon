import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { CATEGORY_CREATE_ERROR, CATEGORY_CREATED_SUCCESSFULLY, CREATE_CATEGORY } from 'src/app/shared/utils/constants/pages-constants';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  title = CREATE_CATEGORY;
  successMessage = CATEGORY_CREATED_SUCCESSFULLY;
  errorMessage = CATEGORY_CREATE_ERROR;

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
  }

}
