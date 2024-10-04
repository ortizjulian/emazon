import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
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
          alert("Creado");
          this.categoryForm.reset();
        },
        error: (err) => {
          console.error('Error al crear la categoría', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
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
