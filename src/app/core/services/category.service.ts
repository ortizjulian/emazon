import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable, map, catchError, throwError } from 'rxjs';
import { CATEGORY_CREATE_ERROR, CATEGORY_CREATED_SUCCESSFULLY, STOCK_CREATE_CATEGORY, TOAST_STATE } from '../../shared/utils/constants/services-constants';
import { ToastService } from './toast.service';
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



  create(categoryData: Category): Observable<boolean> {
    return this.http.post(this.url + STOCK_CREATE_CATEGORY, categoryData).pipe(
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

}
