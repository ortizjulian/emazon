import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../../../core/services/category.service';
import { of } from 'rxjs';
import { CategoryRequest } from '../../../core/models/category.model';
import { PagesModule } from '../pages.module';
import { SortEvent } from '../../../shared/interfaces/SortEvent';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [PagesModule, HttpClientTestingModule],
      providers: [CategoryService]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle submit and call create method of CategoryService', () => {
    const categoryData: CategoryRequest = {
      name: "Iphone",
      description: "Todos los Iphone"
    };

    const createSpy = jest.spyOn(categoryService, 'create').mockReturnValue(of(true));

    component.handleSubmit(categoryData);

    expect(createSpy).toHaveBeenCalledWith(categoryData);
  });

  it('should do nothing if create returns false', () => {
    const categoryData: CategoryRequest = {
      name: "Iphone",
      description: "Todos los Iphone"
    };
    const createSpy = jest.spyOn(categoryService, 'create').mockReturnValue(of(false));

    component.handleSubmit(categoryData);

    expect(createSpy).toHaveBeenCalledWith(categoryData);
  });

  it('should change the current page and call loadCategories on onPageChange', () => {
    const page = 2;
    const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');
    component.onPageChange(page);

    expect(component.currentPage).toBe(page);
    expect(loadCategoriesSpy).toHaveBeenCalled();
  });

  it('should reset currentPage and change currentSize on onShowChange', () => {
    const size = 10;
    const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');
    component.onShowChange(size);

    expect(component.currentPage).toBe(1);
    expect(component.currentSize).toBe(size);
    expect(loadCategoriesSpy).toHaveBeenCalled();
  });

  it('should change sortDirection and sortBy on onSortChange', () => {
    const sortEvent: SortEvent = { direction: 'asc', property: 'name' };
    const loadCategoriesSpy = jest.spyOn(component, 'loadCategories');
    component.onSortChange(sortEvent);

    expect(component.sortDirection).toBe(sortEvent.direction);
    expect(component.sortBy).toBe(sortEvent.property);
    expect(loadCategoriesSpy).toHaveBeenCalled();
  });
});
