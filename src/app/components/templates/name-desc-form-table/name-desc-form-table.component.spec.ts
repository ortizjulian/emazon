import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDescFormTableComponent } from './name-desc-form-table.component';
import { OrganismsModule } from '../../organisms/organisms.module';

describe('NameDescFormTableComponent', () => {
  let component: NameDescFormTableComponent;
  let fixture: ComponentFixture<NameDescFormTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameDescFormTableComponent],
      imports: [OrganismsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NameDescFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
