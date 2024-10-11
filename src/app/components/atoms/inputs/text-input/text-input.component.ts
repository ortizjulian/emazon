
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LABEL_TEXT, PLACEHOLDER_TEXT } from '../../../../shared/utils/constants/atoms-constants';
import { InputSizes } from '../../../../shared/utils/enums/atoms-enums';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() size: InputSizes = InputSizes.NORMAL;
  @Input() label: string = LABEL_TEXT;
  @Input() errorMessage: string = '';

  placeholderText = PLACEHOLDER_TEXT;
  onChange: any = () => { }
  onTouch: any = () => { }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  input: string = '';
  writeValue(input: string) {
    this.input = input;
  }
}
