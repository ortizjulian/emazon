import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDescriptionFormComponent } from './name-description-form.component';

describe('NameDescriptionFormComponent', () => {
  let component: NameDescriptionFormComponent;
  let fixture: ComponentFixture<NameDescriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameDescriptionFormComponent]
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
