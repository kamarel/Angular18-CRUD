import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }

  private baseURL = "/api/v1/products";

  fetchAllProducts(): Observable<Product[]>{
    return this._httpClient.get<Product[]>(`${this.baseURL}`);
  }


  getById(id: number){
    return this._httpClient.get<Product>(`${this.baseURL}/${id}`);
  }


  createProduct(product: Product){
    return this._httpClient.post(`${this.baseURL}`, product);
  }

  updateProduct(product: Product){
    return this._httpClient.put<Product>(`${this.baseURL}/${product.id}`, product);
  }

  deleteProduct(id: number){
    return this._httpClient.delete(`${this.baseURL}/${id}`);
  }
}
