import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { CREATE, DESCRIPTION, DESCRIPTION_CONTROL, DESCRIPTION_MAXLENGTH_ERROR, DESCRIPTION_REQUIRED_ERROR, NAME, NAME_CONTROL, NAME_MAXLENGTH_ERROR, NAME_REQUIRED_ERROR } from '../../../shared/utils/constants/organism-constants';
import { ButtonSizes, ButtonTypes } from '../../../shared/utils/enums/atoms-enums';

@Component({
  selector: 'name-description-form',
  templateUrl: './name-description-form.component.html',
  styleUrls: ['./name-description-form.component.scss']
})
export class NameDescriptionFormComponent implements OnInit {

  @Input() title: string = ''
  @Output() submitForm = new EventEmitter<any>();
  form: FormGroup;

  ButtonSizes = ButtonSizes;
  ButtonTypes = ButtonTypes;

  nameLabel = NAME;
  descriptionLabel = DESCRIPTION;
  createButtonText = CREATE;
  name_control = NAME_CONTROL;
  description_control = DESCRIPTION_CONTROL;


  constructor(private fb: FormBuilder, private toast: ToastService) {
    this.form = this.fb.group({
      [NAME_CONTROL]: ['', [Validators.required, Validators.maxLength(50)]],
      [DESCRIPTION_CONTROL]: ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.form.valid) {
      const entityData = this.form.value;
      this.submitForm.emit(entityData);
      this.form.reset();
    }
  }

  getNameErrorMessage(): string {
    const control = this.form.get(NAME_CONTROL);

    if (!control?.touched) {
      return "";
    }

    if (control?.hasError('required')) {
      return NAME_REQUIRED_ERROR;
    }
    if (control?.hasError('maxlength')) {
      return NAME_MAXLENGTH_ERROR;
    }
    return '';
  }

  getDescriptionErrorMessage(): string {
    const control = this.form.get(DESCRIPTION_CONTROL);

    if (!control?.touched) {
      return "";
    }

    if (control?.hasError('required')) {
      return DESCRIPTION_REQUIRED_ERROR;
    }
    if (control?.hasError('maxlength')) {
      return DESCRIPTION_MAXLENGTH_ERROR;
    }

    return '';
  }
}
