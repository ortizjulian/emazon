import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CATEGORY_CREATE_ERROR, CATEGORY_CREATED_SUCCESSFULLY, CREATE, CREATE_CATEGORY, DESCRIPTION, DESCRIPTION_CONTROL, DESCRIPTION_MAXLENGTH_ERROR, DESCRIPTION_REQUIRED_ERROR, NAME, NAME_CONTROL, NAME_MAXLENGTH_ERROR, NAME_REQUIRED_ERROR } from 'src/app/shared/utils/constants/organism-constants';
import { TOAST_STATE } from 'src/app/shared/utils/constants/services-constants';
import { ButtonSizes, ButtonTypes } from 'src/app/shared/utils/enums/atoms-enums';
@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  ButtonSizes = ButtonSizes;
  ButtonTypes = ButtonTypes;
  createCategory = CREATE_CATEGORY;
  nameLabel = NAME;
  descriptionLabel = DESCRIPTION;
  createButtonText = CREATE;
  name_control = NAME_CONTROL;
  description_control = DESCRIPTION_CONTROL;
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private toast: ToastService) {
    this.categoryForm = this.fb.group({
      [NAME_CONTROL]: ['', [Validators.required, Validators.maxLength(50)]],
      [DESCRIPTION_CONTROL]: ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData: Category = this.categoryForm.value;

      this.categoryService.createCategory(categoryData).subscribe({
        next: () => {
          this.toast.showToast(TOAST_STATE.success, CATEGORY_CREATED_SUCCESSFULLY);
          this.dismiss();
          this.categoryForm.reset();
        },
        error: () => {
          this.toast.showToast(TOAST_STATE.error, CATEGORY_CREATE_ERROR);
          this.dismiss();
        }
      });
    }
  }

  private dismiss(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2000);
  }

  getNameErrorMessage(): string {
    const control = this.categoryForm.get(NAME_CONTROL);

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
    const control = this.categoryForm.get(DESCRIPTION_CONTROL);

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
