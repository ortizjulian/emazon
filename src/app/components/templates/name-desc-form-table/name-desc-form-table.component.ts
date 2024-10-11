import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'name-desc-form-table',
  templateUrl: './name-desc-form-table.component.html',
  styleUrls: ['./name-desc-form-table.component.scss']
})
export class NameDescFormTableComponent implements OnInit {

  @Output() submitForm = new EventEmitter<any>();
  @Input() successMessage: string = '';
  @Input() errorMessage: string = '';
  @Input() title: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(entityData: any) {
    this.submitForm.emit(entityData);
  }
}
