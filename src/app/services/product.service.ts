// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5201/api/Products'; // Adjust the URL as necessary

  constructor(private http: HttpClient) {}

  getProducts(searchQuery: string, page: number, limit: number ): Observable<any[]> {
    return this.http.get<Product[]>(this.apiUrl+"?searchItem="+ searchQuery+"&_page="+page+"&_limit="+limit);
  }

  getaProduct(id : any): Observable<any[]> {
    return this.http.get<Product[]>(this.apiUrl+"/"+id);
  }

  addProduct(product : Product): Observable<any> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id : any ,product: Product): Observable<any> {
    return this.http.put<Product>(this.apiUrl+"/"+id, product);
  }

  deleteProduct(id : any) : Observable<any>
  {
  
    return this.http.delete<void>(this.apiUrl+"/"+id);
  }
}