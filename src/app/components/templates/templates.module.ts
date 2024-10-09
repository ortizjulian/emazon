import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameDescFormTableComponent } from './name-desc-form-table/name-desc-form-table.component';
import { OrganismsModule } from '../organisms/organisms.module';


@NgModule({
  declarations: [
    NameDescFormTableComponent
  ],
  imports: [
    CommonModule,
    OrganismsModule
  ],
  exports: [
    NameDescFormTableComponent
  ]
})
export class TemplatesModule { }
