import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTableComponent } from './advanced-table.component';
import { AtomsModule } from '../../atoms/atoms.module';
import { SortEvent } from 'src/app/shared/interfaces/SortEvent';

describe('AdvancedTableComponent', () => {
  let component: AdvancedTableComponent;
  let fixture: ComponentFixture<AdvancedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvancedTableComponent],
      imports: [AtomsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdvancedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
