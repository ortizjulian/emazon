import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from './buttons/primary-button/primary-button.component';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PrimaryButtonComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PrimaryButtonComponent,
    TextInputComponent
  ]
})
export class AtomsModule { }
