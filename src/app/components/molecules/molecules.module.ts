import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { AdvancedTableComponent } from './advanced-table/advanced-table.component';

@NgModule({
  declarations: [
    AdvancedTableComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
  ],
  exports: [
    AdvancedTableComponent
  ]
})
export class MoleculesModule { }
