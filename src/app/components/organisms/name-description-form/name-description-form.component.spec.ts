import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { NameDescriptionFormComponent } from './name-description-form.component';
import { OrganismsModule } from '../organisms.module';
import { DESCRIPTION_MAXLENGTH_ERROR, DESCRIPTION_REQUIRED_ERROR, NAME_MAXLENGTH_ERROR, NAME_REQUIRED_ERROR } from '../../../shared/utils/constants/organism-constants';
import { EventEmitter } from '@angular/core';

describe('NameDescriptionFormComponent', () => {
  let component: NameDescriptionFormComponent;
  let fixture: ComponentFixture<NameDescriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameDescriptionFormComponent],
      imports: [
        OrganismsModule,
      ],
      providers: [
        FormBuilder,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NameDescriptionFormComponent);
    component = fixture.componentInstance;
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
    const descriptionControl = component.form.get('description');
    descriptionControl?.markAsTouched();

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
    const submitSpy = jest.spyOn(component.submitForm, 'emit');

    component.onSubmit();
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should emit form data when valid', () => {
    const submitSpy = jest.spyOn(component.submitForm, 'emit');

    component.form.setValue({
      name: 'Valid Name',
      description: 'Valid Description'
    });

    component.onSubmit();
    expect(submitSpy).toHaveBeenCalledWith({
      name: 'Valid Name',
      description: 'Valid Description'
    });
  });
});
