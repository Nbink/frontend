import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/productCategory';
import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  apiURLCategories = environment.apiURL + 'productcategories';

  constructor(private http: HttpClient) { }

  getCategories():  Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.apiURLCategories);
  }

  getCategory(categoryId: string):  Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`${this.apiURLCategories}/${categoryId}`);
  }

  createCategory(category: ProductCategory): Observable<ProductCategory>{
    return this.http.post<ProductCategory>(this.apiURLCategories, category);
  }

  updateCategory(category: ProductCategory): Observable<ProductCategory>{
    return this.http.put<ProductCategory>(`${this.apiURLCategories}/${category._id}`, category);
  }

  deleteCategory(categoryId: string): Observable<ProductCategory>{
    return this.http.delete<ProductCategory>(`${this.apiURLCategories}/${categoryId}`);
  }

}

