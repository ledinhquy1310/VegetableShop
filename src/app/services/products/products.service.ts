import { Injectable } from '@angular/core';
import { products } from 'src/app/shared/models/Products';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }
  getAll(): Observable<products[]> {
    return this.http.get<products[]>("http://localhost:3000/products")
      .pipe(map((res: any) => {
        return res
      }))
  }

  getById(id: string): Observable<products> {
    return this.getAll().pipe(
      map(products => products.find(product => product.id === id)!)
    );
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/products/${productId}`);
  }
  addProduct(product: products): Observable<products> {
    return this.http.post<products>(this.apiUrl, product);
  }

  updateProductWithImage(productId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, formData).pipe(
      catchError((error: any) => {
        console.error('Error updating product with image:', error);
        return throwError(error);
      })
    );
  }

  updateProduct(productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productData.id}`, productData).pipe(
      catchError((error: any) => {
        console.error('Error updating product:', error);
        return throwError(error);
      })
    );
  }

}
