import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '../../../shared/interfaces/Option';
import { SELECT_TEXT } from 'src/app/shared/utils/constants/atoms-constants';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: Option[] = [];
  @Input() label?: string;
  @Input() errorMessage: string = '';
  @Input() showDeleteButton: boolean = false;
  @Output() delete = new EventEmitter<void>();

  selectLabel = SELECT_TEXT;
  value: string | null = null;

  onChange: (value: string) => void = () => { };
  onTouched: () => void = () => { };

  constructor() { }

  ngOnInit(): void {
  }
  onDelete(): void {
    this.delete.emit();
  }

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.value = selectElement.value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }
}
