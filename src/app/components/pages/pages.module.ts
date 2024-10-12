import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesModule } from '../templates/templates.module';
import { CategoryComponent } from './category/category.component';

import { MoleculesModule } from '../molecules/molecules.module';
@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    TemplatesModule,
    MoleculesModule
  ]
})
export class PagesModule { }
