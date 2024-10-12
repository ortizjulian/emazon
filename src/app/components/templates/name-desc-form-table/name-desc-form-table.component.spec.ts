import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDescFormTableComponent } from './name-desc-form-table.component';
import { OrganismsModule } from '../../organisms/organisms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { SortEvent } from 'src/app/shared/interfaces/SortEvent';

describe('NameDescFormTableComponent', () => {
  let component: NameDescFormTableComponent;
  let fixture: ComponentFixture<NameDescFormTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameDescFormTableComponent],
      imports: [OrganismsModule, MoleculesModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NameDescFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submitForm event on handleSubmit', () => {
    jest.spyOn(component.submitForm, 'emit');
    const entityData = { name: 'Test Category' };

    component.handleSubmit(entityData);

    expect(component.submitForm.emit).toHaveBeenCalledWith(entityData);
  });

  it('should emit pageChange event on onPageChange', () => {
    jest.spyOn(component.pageChange, 'emit');
    const page = 2;

    component.onPageChange(page);

    expect(component.pageChange.emit).toHaveBeenCalledWith(page);
  });

  it('should emit showChange event on onShowChange', () => {
    jest.spyOn(component.showChange, 'emit');
    const size = 10;

    component.onShowChange(size);

    expect(component.showChange.emit).toHaveBeenCalledWith(size);
  });

  it('should emit sortChange event on onSortChange', () => {
    jest.spyOn(component.sortChange, 'emit');
    const sortEvent: SortEvent = { property: 'name', direction: 'ASC' };

    component.onSortChange(sortEvent);

    expect(component.sortChange.emit).toHaveBeenCalledWith(sortEvent);
  });
});
