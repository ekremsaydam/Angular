import { Component, OnInit } from '@angular/core';
import { Product } from './Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }
  title = 'Ürün Listesi';
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 2500, categoryId: 1, description: 'Asus ZenBook', imageUrl:'https://images.unsplash.com/photo-1523265987393-d988d7d777d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Mouse', price: 25, categoryId: 2, description: 'A4 Tech', imageUrl:'https://images.unsplash.com/photo-1523265987393-d988d7d777d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
    { id: 1, name: 'Laptop', price: 2500, categoryId: 1, description: 'Asus ZenBook', imageUrl:'https://images.unsplash.com/photo-1523265987393-d988d7d777d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Mouse', price: 25, categoryId: 2, description: 'A4 Tech', imageUrl:'https://images.unsplash.com/photo-1523265987393-d988d7d777d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
    { id: 1, name: 'Laptop', price: 2500, categoryId: 1, description: 'Asus ZenBook', imageUrl:'https://images.unsplash.com/photo-1523265987393-d988d7d777d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Mouse', price: 25, categoryId: 2, description: 'A4 Tech', imageUrl:'https://images.unsplash.com/photo-1523265987393-d988d7d777d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }
  ];
  ngOnInit() {
  }

}
