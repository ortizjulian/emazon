import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ARTICLE_CREATE_ERROR, ARTICLE_CREATED_SUCCESSFULLY, STOCK_PATH_ARTICLE, TOAST_STATE } from '../../shared/utils/constants/services-constants';
import { ArticleRequest } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url: string;

  successMessage = ARTICLE_CREATED_SUCCESSFULLY;
  errorMessage = ARTICLE_CREATE_ERROR;

  constructor(private http: HttpClient, private toast: ToastService) {
    this.url = environment.stockApiRoute
  }

  create(articleData: ArticleRequest): Observable<boolean> {
    return this.http.post(this.url + STOCK_PATH_ARTICLE, articleData).pipe(
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
}
