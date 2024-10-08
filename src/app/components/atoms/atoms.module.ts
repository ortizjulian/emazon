import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from './buttons/primary-button/primary-button.component';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
@NgModule({
  declarations: [
    PrimaryButtonComponent,
    TextInputComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PrimaryButtonComponent,
    TextInputComponent,
    ToastComponent
  ]
})
export class AtomsModule { }
