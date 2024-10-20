import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesModule } from '../templates/templates.module';
import { CategoryComponent } from './category/category.component';

import { MoleculesModule } from '../molecules/molecules.module';
import { BrandComponent } from './brand/brand.component';
import { ArticleComponent } from './article/article.component';
import { OrganismsModule } from '../organisms/organisms.module';
@NgModule({
  declarations: [CategoryComponent, BrandComponent, ArticleComponent],
  imports: [
    CommonModule,
    TemplatesModule,
    MoleculesModule,
    OrganismsModule
  ]
})
export class PagesModule { }
