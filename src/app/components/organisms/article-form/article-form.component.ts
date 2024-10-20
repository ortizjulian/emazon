import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BRAND, BRAND_CONTROL, BRAND_REQUIRED_ERROR, CATEGORIES_TEXT, CATEGORY_CONTROL, CREATE, DESCRIPTION, DESCRIPTION_CONTROL, DESCRIPTION_MAXLENGTH_ERROR, DESCRIPTION_REQUIRED_ERROR, DUPLICATE_CATEGORIES_ERROR, MAX_CATEGORIES, NAME, NAME_CONTROL, NAME_MAXLENGTH_ERROR, NAME_REQUIRED_ERROR, PRICE, PRICE_CONTROL, PRICE_PATTERN_ERROR, PRICE_REGEX, PRICE_REQUIRED_ERROR, QUANTITY, QUANTITY_CONTROL, QUANTITY_MIN_ERROR, QUANTITY_PATTERN_ERROR, QUANTITY_REGEX, QUANTITY_REQUIRED_ERROR } from '../../../shared/utils/constants/organism-constants';
import { ButtonSizes, ButtonTypes } from '../../../shared/utils/enums/atoms-enums';
import { Option } from 'src/app/shared/interfaces/Option';
import { ToastService } from 'src/app/core/services/toast.service';
import { TOAST_STATE } from 'src/app/shared/utils/constants/services-constants';
@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  @Input() title: string = ''
  @Output() submitForm = new EventEmitter<any>();
  @Input() brandOptions: Option[] = [];
  @Input() categoryOptions: Option[] = [];
  form: FormGroup;

  ButtonSizes = ButtonSizes;
  ButtonTypes = ButtonTypes;

  nameLabel = NAME;
  descriptionLabel = DESCRIPTION;
  quantityLabel = QUANTITY;
  priceLabel = PRICE;
  brandLabel = BRAND;
  categoriesText = CATEGORIES_TEXT;

  createButtonText = CREATE;

  nameControl = NAME_CONTROL;
  descriptionControl = DESCRIPTION_CONTROL;
  quantityControl = QUANTITY_CONTROL;
  priceControl = PRICE_CONTROL;
  brandControl = BRAND_CONTROL;
  categoryControl = CATEGORY_CONTROL;

  constructor(private fb: FormBuilder, public toast: ToastService) {
    this.form = this.fb.group({
      [NAME_CONTROL]: ['', [Validators.required, Validators.maxLength(50)]],
      [DESCRIPTION_CONTROL]: ['', [Validators.required, Validators.maxLength(120)]],
      [QUANTITY_CONTROL]: ['', [Validators.required, Validators.min(1), Validators.pattern(QUANTITY_REGEX)]],
      [PRICE_CONTROL]: ['', [Validators.required, Validators.pattern(PRICE_REGEX)]],
      [BRAND_CONTROL]: [''],
      [CATEGORY_CONTROL]: this.fb.array([])
    });

    this.addCategory();
  }

  onSubmit() {
    if (this.form.valid) {
      const entityData = this.form.value;

      const transformedCategoryIds = entityData.categoryIds.map((item: { categoryId: string }) => Number(item.categoryId));
      entityData.categoryIds = transformedCategoryIds;
      const hasDuplicates = transformedCategoryIds.some((id: number, index: number) => transformedCategoryIds.indexOf(id) !== index);


      if (hasDuplicates) {
        this.toast.showToast(TOAST_STATE.error, DUPLICATE_CATEGORIES_ERROR);
        return;
      }
      entityData.brandId = Number(entityData.brandId);

      console.log(entityData);
      this.submitForm.emit(entityData);
      this.form.reset();
    }
  }


  getNameErrorMessage(): string {
    const control = this.form.get(this.nameControl);

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
    const control = this.form.get(this.descriptionControl);

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

  getQuantityErrorMessage(): string {
    const control = this.form.get(this.quantityControl);

    if (!control?.touched) {
      return "";
    }

    if (control?.hasError('required')) {
      return QUANTITY_REQUIRED_ERROR;
    }

    if (control?.hasError('min')) {
      return QUANTITY_MIN_ERROR;
    }

    if (control?.hasError('pattern')) {
      return QUANTITY_PATTERN_ERROR;
    }

    return '';
  }

  getPriceErrorMessage(): string {
    const control = this.form.get(this.priceControl);

    if (!control?.touched) {
      return "";
    }

    if (control?.hasError('required')) {
      return PRICE_REQUIRED_ERROR;
    }

    if (control?.hasError('pattern')) {
      return PRICE_PATTERN_ERROR;
    }
    return '';
  }

  getBrandErrorMessage() {
    const control = this.form.get(this.brandControl);
    if (!control?.touched) {
      return "";
    }

    if (control?.value === "") {
      return BRAND_REQUIRED_ERROR;
    }

    return '';
  }
  createCategory(): FormGroup {
    return this.fb.group({
      categoryId: ['', [Validators.required]]
    });
  }

  addCategory(): void {
    const categoriesArray = this.form.get(this.categoryControl) as FormArray;

    if (categoriesArray.length < 3) {
      categoriesArray.push(this.createCategory());
    } else {
      this.toast.showToast(TOAST_STATE.error, MAX_CATEGORIES);
    }
  }

  removeCategory(index: number): void {
    const categoriesArray = this.form.get(this.categoryControl) as FormArray;
    if (categoriesArray.length > 1) {
      categoriesArray.removeAt(index);
    }
  }

  getCategoriesArray(): FormArray {
    return this.form.get(this.categoryControl) as FormArray;
  }
}
