import { Component, Input } from '@angular/core';

@Component({
  selector: 'primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss']
})
export class PrimaryButtonComponent {
  @Input() disabled: boolean = false;
  @Input() size: 'large' | 'medium' | 'small' = 'medium';
  @Input() type: 'main' | 'secondary' = 'main';
}
