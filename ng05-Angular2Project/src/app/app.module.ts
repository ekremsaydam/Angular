import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductsfilterPipe } from './product/productsfilter.pipe';
import { TodoComponent } from './todo/todo.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';

const appRoutes: Routes = [
  {
    path: 'products',
    component: ProductComponent,
    data: {
      title: 'Product List'
    }
  },
  {
    path: '',
    component: TodoComponent
  },
  {
    path: 'todos',
    component: TodoComponent
  },
  {
    path: 'todos/:id',
    component: TodoDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsfilterPipe,
    TodoComponent,
    TodoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
