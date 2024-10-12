import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CategoryRequest } from '../models/category.model';
import { Observable, map, catchError, throwError } from 'rxjs';
import { CATEGORY_CREATE_ERROR, CATEGORY_CREATED_SUCCESSFULLY, STOCK_PATH_CATEGORY, TOAST_STATE } from '../../shared/utils/constants/services-constants';
import { ToastService } from './toast.service';
import { Pagination } from '../models/pagination.model';
import { PaginationParams } from '../../shared/interfaces/PaginationParams';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string;

  successMessage = CATEGORY_CREATED_SUCCESSFULLY;
  errorMessage = CATEGORY_CREATE_ERROR;

  constructor(private http: HttpClient, private toast: ToastService) {
    this.url = environment.stockApiRoute
  }

  create(categoryData: CategoryRequest): Observable<boolean> {
    return this.http.post(this.url + STOCK_PATH_CATEGORY, categoryData).pipe(
      map(() => {
        this.toast.showToast(TOAST_STATE.success, CATEGORY_CREATED_SUCCESSFULLY);
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.Message ? `${this.errorMessage}: ${err.error.Message}` : this.errorMessage;
        this.toast.showToast(TOAST_STATE.error, errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }


  listAll(params: PaginationParams = {}): Observable<Pagination> {

    const page = params.page || 0;
    const size = params.size || 10;
    const sortDirection = params.sortDirection || 'asc';
    const sortBy = params.sortBy || 'name';

    const httpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortDirection', sortDirection)
      .set('sortBy', sortBy);

    return this.http.get<Pagination>(this.url + STOCK_PATH_CATEGORY, { params: httpParams });
  }

}
