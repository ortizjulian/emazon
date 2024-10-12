import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryRequest } from '../models/category.model';
import { ToastService } from './toast.service';
import { CATEGORY_CREATE_ERROR, CATEGORY_CREATED_SUCCESSFULLY, STOCK_PATH_CATEGORY, TOAST_STATE } from '../../shared/utils/constants/services-constants';
import { environment } from '../../../environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let toastService: ToastService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    })
      .compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create() should create a category and show success toast', () => {
    const categoryData: CategoryRequest = {
      name: "Iphone",
      description: "Todos los Iphone"
    };

    service.create(categoryData).subscribe((result) => {
      expect(result).toBe(true);
      expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.success, CATEGORY_CREATED_SUCCESSFULLY);
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_CATEGORY}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('create() should show error toast on creation failure', () => {
    const categoryData: CategoryRequest = {
      name: "Iphone",
      description: "Todos los Iphone"
    };
    const errorResponse = { Message: 'There is already a category with that name' };

    service.create(categoryData).subscribe({
      next: () => {
        fail('Expected an error, but got success');
      },
      error: (error) => {
        expect(error.message).toBe(`${CATEGORY_CREATE_ERROR} There is already a category with that name`);
        expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.error, `${CATEGORY_CREATE_ERROR} There is already a category with that name`);
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_CATEGORY}`);
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse, { status: 409, statusText: 'Conflict' });
  });

  it('create() should show error toast on creation failure without specific message', () => {
    const categoryData: CategoryRequest = {
      name: "Iphone",
      description: "Todos los Iphone"
    };
    const errorResponse = {};

    service.create(categoryData).subscribe({
      next: () => {
        fail('Expected an error, but got success');
      },
      error: (error) => {
        expect(error.message).toBe(CATEGORY_CREATE_ERROR);
        expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.error, CATEGORY_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_CATEGORY}`);
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });

});
