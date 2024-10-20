import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ToastService } from './toast.service';
import { BrandRequest } from '../models/brand.model';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BRAND_CREATE_ERROR, BRAND_CREATED_SUCCESSFULLY, BRAND_LIST_ERROR, PAGINATION_PAGE, PAGINATION_SIZE, SORT_BY, SORT_DIRECTION, STOCK_PATH_BRAND, TOAST_STATE } from '../../shared/utils/constants/services-constants';
import { Pagination } from '../models/pagination.model';
import { PaginationParams } from '../../shared/interfaces/PaginationParams';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private url: string;
  successMessage = BRAND_CREATED_SUCCESSFULLY;
  errorMessage = BRAND_CREATE_ERROR;

  listErrorMessage = BRAND_LIST_ERROR;

  constructor(private http: HttpClient, private toast: ToastService) {
    this.url = environment.stockApiRoute
  }

  create(brandData: BrandRequest): Observable<boolean> {
    return this.http.post(this.url + STOCK_PATH_BRAND, brandData).pipe(
      map(() => {
        this.toast.showToast(TOAST_STATE.success, this.successMessage);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.Message ? `${this.errorMessage}: ${err.error.Message}` : this.errorMessage;
        this.toast.showToast(TOAST_STATE.error, errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  listAll(params: PaginationParams): Observable<Pagination> {

    const httpParams = new HttpParams()
      .set(PAGINATION_PAGE, params.page.toString())
      .set(PAGINATION_SIZE, params.size.toString())
      .set(SORT_DIRECTION, params.sortDirection)
      .set(SORT_BY, params.sortBy);

    return this.http.get<Pagination>(this.url + STOCK_PATH_BRAND, { params: httpParams }).pipe(
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.Message ? `${this.listErrorMessage}: ${err.error.Message}` : this.listErrorMessage;
        this.toast.showToast(TOAST_STATE.error, errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
