import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesModule } from '../templates/templates.module';
import { CategoryComponent } from './category/category.component';
@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    TemplatesModule
  ]
})
export class PagesModule { }
