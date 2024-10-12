import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryRequest } from '../models/category.model';
import { ToastService } from './toast.service';
import { CATEGORY_CREATE_ERROR, CATEGORY_CREATED_SUCCESSFULLY, PAGINATION_PAGE, PAGINATION_SIZE, SORT_BY, SORT_DIRECTION, STOCK_PATH_CATEGORY, TOAST_STATE } from '../../shared/utils/constants/services-constants';
import { environment } from '../../../environments/environment';
import { PaginationParams } from 'src/app/shared/interfaces/PaginationParams';
import { Pagination } from '../models/pagination.model';

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

  it('listAll() should retrieve categories and return pagination data', () => {
    const params: PaginationParams = {
      page: 1,
      size: 10,
      sortDirection: 'ASC',
      sortBy: 'name'
    };

    const mockPaginationResponse: Pagination = {
      totalPages: 5,
      content: []
    };

    service.listAll(params).subscribe((response) => {
      expect(response).toEqual(mockPaginationResponse);
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_CATEGORY}?${PAGINATION_PAGE}=1&${PAGINATION_SIZE}=10&${SORT_DIRECTION}=ASC&${SORT_BY}=name`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.has(PAGINATION_PAGE)).toBe(true);
    expect(req.request.params.has(PAGINATION_SIZE)).toBe(true);
    expect(req.request.params.has(SORT_DIRECTION)).toBe(true);
    expect(req.request.params.has(SORT_BY)).toBe(true);
    req.flush(mockPaginationResponse);
  });

  it('listAll() should show error toast on failure', () => {
    const params: PaginationParams = {
      page: 1,
      size: 10,
      sortDirection: 'ASC',
      sortBy: 'name'
    };
    const errorResponse = { Message: 'Failed to load categories' };

    service.listAll(params).subscribe({
      next: () => {
        fail('Expected an error, but got success');
      },
      error: (error) => {
        expect(error.message).toBe('Error Listing the categories: Failed to load categories');
        expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.error, 'Error Listing the categories: Failed to load categories');
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_CATEGORY}?${PAGINATION_PAGE}=1&${PAGINATION_SIZE}=10&${SORT_DIRECTION}=ASC&${SORT_BY}=name`);
    expect(req.request.method).toBe('GET');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });

  it('listAll() should show error toast on failure without specific message', () => {
    const params: PaginationParams = {
      page: 1,
      size: 10,
      sortDirection: 'ASC',
      sortBy: 'name'
    };
    const errorResponse = {};

    service.listAll(params).subscribe({
      next: () => {
        fail('Expected an error, but got success');
      },
      error: (error) => {
        expect(error.message).toBe('Error Listing the categories');
        expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.error, 'Error Listing the categories');
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_CATEGORY}?${PAGINATION_PAGE}=1&${PAGINATION_SIZE}=10&${SORT_DIRECTION}=ASC&${SORT_BY}=name`);
    expect(req.request.method).toBe('GET');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });
});
