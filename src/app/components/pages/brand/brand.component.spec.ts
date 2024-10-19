import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrandComponent } from './brand.component';
import { BrandService } from '../../../core/services/brand.service';
import { PagesModule } from '../pages.module';
import { of } from 'rxjs';
import { BrandRequest } from '../../../core/models/brand.model';
import { SortEvent } from '../../../shared/interfaces/SortEvent';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  let brandService: BrandService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandComponent],
      imports: [PagesModule, HttpClientTestingModule],
      providers: [BrandService]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle submit and call create method of brandService', () => {
    const brandData: BrandRequest = {
      name: "Mattelsa",
      description: "Ropa"
    };

    const createSpy = jest.spyOn(brandService, 'create').mockReturnValue(of(true));

    component.handleSubmit(brandData);

    expect(createSpy).toHaveBeenCalledWith(brandData);
  });

  it('should do nothing if create returns false', () => {
    const brandData: BrandRequest = {
      name: "Mattelsa",
      description: "Ropa"
    };
    const createSpy = jest.spyOn(brandService, 'create').mockReturnValue(of(false));

    component.handleSubmit(brandData);

    expect(createSpy).toHaveBeenCalledWith(brandData);
  });

  it('should change the current page and call loadBrands on onPageChange', () => {
    const page = 2;
    const loadBrandsSpy = jest.spyOn(component, 'loadBrands');
    component.onPageChange(page);

    expect(component.currentPage).toBe(page);
    expect(loadBrandsSpy).toHaveBeenCalled();
  });

  it('should reset currentPage and change currentSize on onShowChange', () => {
    const size = 10;
    const loadBrandsSpy = jest.spyOn(component, 'loadBrands');
    component.onShowChange(size);

    expect(component.currentPage).toBe(1);
    expect(component.currentSize).toBe(size);
    expect(loadBrandsSpy).toHaveBeenCalled();
  });

  it('should change sortDirection and sortBy on onSortChange', () => {
    const sortEvent: SortEvent = { direction: 'asc', property: 'name' };
    const loadBrandsSpy = jest.spyOn(component, 'loadBrands');
    component.onSortChange(sortEvent);

    expect(component.sortDirection).toBe(sortEvent.direction);
    expect(component.sortBy).toBe(sortEvent.property);
    expect(loadBrandsSpy).toHaveBeenCalled();
  });
});
