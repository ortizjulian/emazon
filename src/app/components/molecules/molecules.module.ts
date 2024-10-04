import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    AtomsModule
  ],
  exports: [
    ToastComponent
  ]
})
export class MoleculesModule { }
