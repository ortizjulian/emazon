import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.stockApiRoute
  }

  createCategory(categoryData: Category): Observable<any> {
    return this.http.post(this.url + "/category", categoryData);
  }

}
