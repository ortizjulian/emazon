import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameDescFormTableComponent } from './name-desc-form-table/name-desc-form-table.component';
import { OrganismsModule } from '../organisms/organisms.module';
import { MoleculesModule } from '../molecules/molecules.module';


@NgModule({
  declarations: [
    NameDescFormTableComponent
  ],
  imports: [
    CommonModule,
    OrganismsModule,
    MoleculesModule
  ],
  exports: [
    NameDescFormTableComponent
  ]
})
export class TemplatesModule { }
