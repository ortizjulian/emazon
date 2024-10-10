import { Component, Input } from '@angular/core';
import { ButtonSizes, ButtonTypes } from '../../../../shared/utils/enums/atoms-enums';

@Component({
  selector: 'primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() disabled: boolean = false;
  @Input() size: ButtonSizes = ButtonSizes.MEDIUM;
  @Input() type: ButtonTypes = ButtonTypes.MAIN;
}
