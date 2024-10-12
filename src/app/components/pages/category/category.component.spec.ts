import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../../../core/services/category.service';
import { of } from 'rxjs';
import { CategoryRequest } from 'src/app/core/models/category.model';
import { PagesModule } from '../pages.module';

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
});
