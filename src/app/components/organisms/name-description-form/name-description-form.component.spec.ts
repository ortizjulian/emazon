import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { NameDescriptionFormComponent } from './name-description-form.component';
import { OrganismsModule } from '../organisms.module';
import { DESCRIPTION_MAXLENGTH_ERROR, DESCRIPTION_REQUIRED_ERROR, NAME_MAXLENGTH_ERROR, NAME_REQUIRED_ERROR } from '../../../shared/utils/constants/organism-constants';
import { CategoryService } from '../.../../../../core/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NameDescriptionFormComponent', () => {
  let component: NameDescriptionFormComponent;
  let fixture: ComponentFixture<NameDescriptionFormComponent>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameDescriptionFormComponent],
      imports: [
        OrganismsModule,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        CategoryService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NameDescriptionFormComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    component.service = categoryService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    const nameControl = component.form.get('name');
    const descriptionControl = component.form.get('description');

    expect(nameControl?.value).toBe('');
    expect(descriptionControl?.value).toBe('');
  });

  it('should return empty string when no error for name', () => {
    const nameControl = component.form.get('name');
    nameControl?.markAsTouched();
    nameControl?.setErrors(null);

    expect(component.getNameErrorMessage()).toBe('');
  });

  it('should return empty string when no error for description', () => {
    const descriptionControl = component.form.get('description');
    descriptionControl?.markAsTouched();
    descriptionControl?.setErrors(null);

    expect(component.getDescriptionErrorMessage()).toBe('');
  });

  it('should show error message for invalid name (required)', () => {
    const nameControl = component.form.get('name');
    nameControl?.markAsTouched();

    expect(component.getNameErrorMessage()).toBe(NAME_REQUIRED_ERROR);
  });

  it('should show error message for invalid description (required)', () => {
    const nameControl = component.form.get('description');
    nameControl?.markAsTouched();

    expect(component.getDescriptionErrorMessage()).toBe(DESCRIPTION_REQUIRED_ERROR);
  });

  it('should show error message for invalid name (maxlength)', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('A'.repeat(51));
    nameControl?.markAsTouched();

    expect(component.getNameErrorMessage()).toBe(NAME_MAXLENGTH_ERROR);
  });

  it('should show error message for invalid description (maxlength)', () => {
    const descriptionControl = component.form.get('description');
    descriptionControl?.setValue('A'.repeat(121));
    descriptionControl?.markAsTouched();

    expect(component.getDescriptionErrorMessage()).toBe(DESCRIPTION_MAXLENGTH_ERROR);
  });

  it('should not submit form if invalid', () => {
    const createSpy = jest.spyOn(categoryService, 'create').mockReturnValue(of(true));

    component.onSubmit();
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should submit form and reset it when valid', () => {
    const createSpy = jest.spyOn(categoryService, 'create').mockReturnValue(of(true));

    component.form.setValue({
      name: 'Valid Name',
      description: 'Valid Description'
    });

    component.onSubmit();
    expect(createSpy).toHaveBeenCalledWith({
      name: 'Valid Name',
      description: 'Valid Description'
    });
  });

});
