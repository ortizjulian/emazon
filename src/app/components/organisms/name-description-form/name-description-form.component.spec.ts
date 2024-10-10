import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDescriptionFormComponent } from './name-description-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from '../../atoms/buttons/primary-button/primary-button.component';
import { TextInputComponent } from '../../atoms/inputs/text-input/text-input.component';
import { OrganismsModule } from '../organisms.module';

describe('NameDescriptionFormComponent', () => {
  let component: NameDescriptionFormComponent;
  let fixture: ComponentFixture<NameDescriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameDescriptionFormComponent,],
      imports: [OrganismsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NameDescriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
