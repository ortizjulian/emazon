import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NameDescriptionFormComponent } from './name-description-form/name-description-form.component';

@NgModule({
  declarations: [
    NameDescriptionFormComponent,
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    ReactiveFormsModule,
  ],
  exports: [
    NameDescriptionFormComponent
  ]
})
export class OrganismsModule { }
