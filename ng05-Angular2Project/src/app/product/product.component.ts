import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }
  // productService = new ProductService();

  title = 'Product List';
  products: Product[];
  filterText: string;

  getProduct(): void {
    this.products = this.productService.getProducts();

  }

  ngOnInit() {
    this.getProduct();
  }

}
