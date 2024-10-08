import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { TOAST_STATE, ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private toast: ToastService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(120)]],
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData: Category = this.categoryForm.value;

      this.categoryService.createCategory(categoryData).subscribe({
        next: (response) => {
          this.toast.showToast(
            TOAST_STATE.success,
            'Categoría creada exitosamente');
          this.dismiss();
          this.categoryForm.reset();
        },
        error: (err) => {
          this.toast.showToast(
            TOAST_STATE.error,
            'Error al crear la categoría'
          );
          this.dismiss();
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  private dismiss(): void {
    setTimeout(() => {
      this.toast.dismissToast();
    }, 2000);
  }

  getNameErrorMessage(): string {
    const control = this.categoryForm.get('name');

    if (!control?.touched) {
      return "";
    }

    if (control?.hasError('required')) {
      return 'El nombre es obligatorio.';
    }
    if (control?.hasError('maxlength')) {
      return 'La descripción no puede exceder los 50 caracteres.';
    }
    return '';
  }

  getDescriptionErrorMessage(): string {
    const control = this.categoryForm.get('description');

    if (!control?.touched) {
      return "";
    }

    if (control?.hasError('required')) {
      return 'La descripción es obligatoria.';
    }

    if (control?.hasError('maxlength')) {
      return 'La descripción no puede exceder los 120 caracteres.';
    }

    return '';
  }
}
