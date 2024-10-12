import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesModule } from '../templates/templates.module';
import { CategoryComponent } from './category/category.component';
import { AtomsModule } from '../atoms/atoms.module';
@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    TemplatesModule,
    AtomsModule
  ]
})
export class PagesModule { }
