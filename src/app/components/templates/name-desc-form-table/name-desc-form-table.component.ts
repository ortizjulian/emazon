import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'name-desc-form-table',
  templateUrl: './name-desc-form-table.component.html',
  styleUrls: ['./name-desc-form-table.component.scss']
})
export class NameDescFormTableComponent implements OnInit {

  @Input() service: any;
  @Input() successMessage: string = '';
  @Input() errorMessage: string = '';
  @Input() title: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
