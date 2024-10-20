import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from './buttons/primary-button/primary-button.component';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { ShowByComponent } from './show-by/show-by.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TableComponent } from './table/table.component';
import { DropdownComponent } from './dropdown/dropdown.component';
@NgModule({
  declarations: [
    PrimaryButtonComponent,
    TextInputComponent,
    ToastComponent,
    SortByComponent,
    ShowByComponent,
    PaginationComponent,
    TableComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PrimaryButtonComponent,
    TextInputComponent,
    ToastComponent,
    SortByComponent,
    ShowByComponent,
    PaginationComponent,
    TableComponent,
    DropdownComponent
  ]
})
export class AtomsModule { }
