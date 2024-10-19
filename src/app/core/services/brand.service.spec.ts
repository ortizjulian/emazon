import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { ToastService } from './toast.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandRequest } from '../models/brand.model';
import { BRAND_CREATE_ERROR, BRAND_CREATED_SUCCESSFULLY, PAGINATION_PAGE, PAGINATION_SIZE, SORT_BY, SORT_DIRECTION, STOCK_PATH_BRAND, TOAST_STATE } from '../../shared/utils/constants/services-constants';
import { environment } from '../../../environments/environment';
import { PaginationParams } from '../../shared/interfaces/PaginationParams';
import { Pagination } from '../models/pagination.model';
describe('BrandService', () => {
  let service: BrandService;
  let toastService: ToastService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [BrandService]
    })
      .compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create() should create a brand and show success toast', () => {
    const brandData: BrandRequest = {
      name: "Mattelsa",
      description: "Ropa"
    };

    service.create(brandData).subscribe((result) => {
      expect(result).toBe(true);
      expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.success, BRAND_CREATED_SUCCESSFULLY);
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_BRAND}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('create() should show error toast on creation failure', () => {
    const brandData: BrandRequest = {
      name: "Mattelsa",
      description: "Ropa"
    };
    const errorResponse = { Message: 'There is already a brand with that name' };

    service.create(brandData).subscribe({
      next: () => {
        fail('Expected an error, but got success');
      },
      error: (error) => {
        expect(error.message).toBe(`${BRAND_CREATE_ERROR} There is already a brand with that name`);
        expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.error, `${BRAND_CREATE_ERROR} There is already a brand with that name`);
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_BRAND}`);
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse, { status: 409, statusText: 'Conflict' });
  });

  it('create() should show error toast on creation failure without specific message', () => {
    const brandData: BrandRequest = {
      name: "Mattelsa",
      description: "Ropa"
    };
    const errorResponse = {};

    service.create(brandData).subscribe({
      next: () => {
        fail('Expected an error, but got success');
      },
      error: (error) => {
        expect(error.message).toBe(BRAND_CREATE_ERROR);
        expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.error, BRAND_CREATE_ERROR);
      },
    });
    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_BRAND}`);
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });

  it('listAll() should retrieve brands and return pagination data', () => {
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

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_BRAND}?${PAGINATION_PAGE}=1&${PAGINATION_SIZE}=10&${SORT_DIRECTION}=ASC&${SORT_BY}=name`);
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
    const errorResponse = { Message: 'Failed to load brands' };

    service.listAll(params).subscribe({
      next: () => {
        fail('Expected an error, but got success');
      },
      error: (error) => {
        expect(error.message).toBe('Error Listing the brands: Failed to load brands');
        expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.error, 'Error Listing the brands: Failed to load brands');
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_BRAND}?${PAGINATION_PAGE}=1&${PAGINATION_SIZE}=10&${SORT_DIRECTION}=ASC&${SORT_BY}=name`);
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
        expect(error.message).toBe('Error Listing the brands');
        expect(toastService.showToast).toHaveBeenCalledWith(TOAST_STATE.error, 'Error Listing the brands');
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiRoute}${STOCK_PATH_BRAND}?${PAGINATION_PAGE}=1&${PAGINATION_SIZE}=10&${SORT_DIRECTION}=ASC&${SORT_BY}=name`);
    expect(req.request.method).toBe('GET');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });
})
