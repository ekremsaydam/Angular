import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './product-list.mock';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
    return PRODUCTS;
  }
}
