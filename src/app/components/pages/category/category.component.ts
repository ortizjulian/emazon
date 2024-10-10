import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { CREATE_CATEGORY } from '../../../shared/utils/constants/pages-constants';

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

}
