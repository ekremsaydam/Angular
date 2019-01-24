# Angular Nedir?

- AngularJS
- Angular 2
- Angular 4
- Angular 5
- Angular 6
- Angular 7

## Angular Dili

Javascript, TypeScript

# Angular CLI

```npm install -g @angular/cli```

## dependencies and devDependencies 
- __dependencies__ : Proje görünümüyle alakalı bir durumda kullanılan moduller
- __devDependencies__ : Geliştiricilerin kullandığı meduller

>### npm ile modul ekleme
>`npm install bootstrap@4.1.3 --save`
>
>`npm install font-awesome`

## Yeni proje oluşturmak
```ng new ng01-Intro```

## Yeni Componen oluşturma
```ng generate component product```

```ng g component product```

> __Komponent ilk yüklendiğinde `OnInit` metodu çalışır.__

## Pipe
`<h5 class="card-title">{{product.name}} - <small>{{product.price | currency: 'TRY':true:'1.2-2'}}`

### Custom Pipe 
Veriyi filtrelemek için kullanılır.

Özelleştirilmiş pipe yaratmak için aşağıdaki komut kullanılır.
>`ng g pipe productFilter`

### Modül Mantığı
![Module Mantığı](library-module.png)

### global styles.css ve component.css
>https://getbootstrap.com/docs/4.2/examples/dashboard/
```css 
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~font-awesome/css/font-awesome.min.css";
```

# Binding
## __One way binding__ : 
`<p class="card-text">{{product.description}}</p>`
## __Two way binding__ :
app.module.ts içine `import { FormsModule } from '@angular/forms';`

html dosyası içine `<input [(ngModel)]="filterText" type="text" class="form-control" id="productName" placeholder="Arama metnini girin" >`

product.component.ts içine `filterText = 'm';`


# Event Binding
html içine `<a (click)="addToCart(product)" class="btn btn-primary">Sepete Ekle</a>`

ts içerisine `addToCart(product: Product) {`

# ALERTIFYJS Yükleme
https://alertifyjs.com/

`npm install alertifyjs`

- [x] angular.json içerisindeki scripts tagında belirtiliyor.

- [x] kullanılacak ts dosyasının içine `declare let alertify: any;` eklenerek alertify metodu eklenen javascript dosyaları içerisinde  içerisinde aranarak bulunur

- [x] `Ayrıca ng server --open` durdurularak yeniden başlatılır. third party uygulamalarda bu şekilde yeniden başlatmak gereklidir.

- [x] `alertify.success('Added');` eklenerek istenilen yerde çalştırılabilir.

# Servislerle Çalışmak

## Global Servisleri Anlamak
> Bellekte tutulur. Herkes aynı metodu kullanır.

- [x] services klasörü açılır.

- [x] `ng g service alertify` komutundan yararlanılır.

- [x] app.module.ts içerisindeki `providers: [AlertifyService]` eklenirse global servis olacağını tanımlamış oluyoruz.

## Local Servisleri Anlamak
> component sipesifik olur. Her kullanıcı için örnek yeniden oluşur.
`{
  providedIn: 'root'
}`
Kısmı silinmelidir.


# json-server yükleme
https://github.com/typicode/json-server

`npm install -g json-server`

## Developer aşamasında Postman ile kullanılır.
https://www.getpostman.com/

# HttpClientModule

app.module.ts içerisinde `import { HttpClientModule } from '@angular/common/http';`
product.component.ts içerisinde `import { HttpClient } from '@angular/common/http';`

product.components içerisinde
```javascript
  constructor(private alertifyService: AlertifyService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:3000/products').subscribe(data => {
      this.products = data;
    });
  }
```

# Observable Mimarisi
```javascript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  path = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path);
  }
}
```

## Observable ile Loglama ve Hata Yakalama (pipe())

```javascript
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../product/Product';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  path = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Bir hata oluşru ' + err.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata';
    }

    return throwError(errorMessage);
  }
}
```

# Routing Mimarisini Anlamak

> app-routing.module.ts içerisinde

```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products/category/:categoryId', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

> app.component.js içerisinde ise

```html
<app-nav></app-nav>
<div class="row">
	<div class="col-md-2">
		<app-category></app-category>
	</div>
	<div class="col-md-10">
		<router-outlet></router-outlet>
	</div>
</div>
```

> category.component.html içeriği

```html
<h3>{{title}}</h3>
<div class="list-group">
	<a class="list-group-item active">Tüm Ürünler</a>
</div>

<div class="list-group" *ngFor='let category of categories'>
	<a class="list-group-item" routerLink="products/category/{{category.id}}">{{category.name}}</a>
</div>
```

> product.component.ts i.eriği

```javascript
ngOnInit() {
  this.activatedRoute.params.subscribe(params => {
    this.productService.getProducts(params['categoryId']).subscribe(data => {
      this.products = data;
    });
  });
```

> product.service.ts

```javascript
  getProducts(categoryId): Observable<Product[]> {
    let newPath = this.path;
    if (categoryId) {
      newPath += '?categoryId=' + categoryId;
    }

    return this.http.get<Product[]>(newPath).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
```

# Klasik Form Eklemek

```html
<h3>Yeni Ürün Ekle</h3>

<form #productAddForm="ngForm" (ngSubmit)="add(productAddForm)">
	<div class="form-group">
		<input type="text" #name="ngModel" placeholder="Ürün ismi" [(ngModel)]="model.name" class="form-control" name="name" id="name" required>
		<div *ngIf="name.invalid && name.dirty" class="alert alert-danger">Ürün ismi gereklidir.</div>
	</div>
	<div class="form-group">
		<input type="text" #description="ngModel" placeholder="Açıklama" [(ngModel)]="model.description" class="form-control" name="description" id="description" required>
		<div *ngIf="description.invalid && description.dirty" class="alert alert-danger">Açıklama gereklidir.</div>
	</div>
	<div class="form-group">
		<input type="text" #imageUrl="ngModel" placeholder="Ürün Resmi" [(ngModel)]="model.imageUrl" class="form-control" name="imageUrl" id="imageUrl" required>
		<div *ngIf="imageUrl.invalid && imageUrl.dirty" class="alert alert-danger">Ürün Resmi gereklidir.</div>
	</div>
	<div class="form-group">
		<input type="text" #price="ngModel" placeholder="Ürün Fiyatı" [(ngModel)]="model.price" class="form-control" name="price" id="price" required>
		<div *ngIf="price.invalid && price.dirty" class="alert alert-danger">Fiyat bilgisi gereklidir.</div>
	</div>
	<div class="form-group">
		<select #categoryId="ngModel" [(ngModel)]="model.categoryId" name="categoryId" id="categoryId" required class="form-control">
			<option *ngFor="let category of categories" [value]="category.id">{{category.name}}</option>
		</select>
		<div *ngIf="categoryId.invalid && categoryId.touched" class="alert alert-danger">Kategori Gereklidir.</div>
    </div>
    <button type="submit" class="btn btn-primary" [disabled]="productAddForm.invalid">Ürün Ekle</button>
</form>
```

eklenece yere

```javascript
add(form: NgForm) {
    console.log(form.value.name);
}
```

# Reaktive Form eklemek

> component içerisinde

```javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Product';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-product-add-forms2',
  templateUrl: './product-add-forms2.component.html',
  styleUrls: ['./product-add-forms2.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddForms2Component implements OnInit {
  categoryService: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoriService: CategoryService,
    private productService: ProductService,
    private alertifyService: AlertifyService
  ) { }

  productAddForm: FormGroup;
  product: Product = new Product();
  categories: Category[];

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createProductAddForm();
    this.categoriService.getCategories().subscribe(data =>
      this.categories = data
    );
  }

  add() {
    if (this.productAddForm.valid) {
      this.product = Object.assign({}, this.productAddForm.value);
    }
    console.log('İşlem Yapıldı');
    this.productService.addProduct(this.product).subscribe(data => {
      this.alertifyService.success(data.name + ' başarıyla eklendi.');
    });

  }

}
```

> component html içerisinde

```html
<h3>Yeni Ürün Ekle - Reactive</h3>
<form [formGroup]="productAddForm" (ngSubmit)="add()">
	<div class="form-group">
		<input type="text" id="name" name="name" formControlName="name" class="form-control" placeholder="Ürün Adı">
		<div class="alert alert-danger" *ngIf="productAddForm.get('name').hasError('required') && productAddForm.get('name').dirty">Ürün adı zorunludur.</div>
	</div>
	<div class="form-group">
		<input type="text" id="description" name="description" formControlName="description" class="form-control" placeholder="Ürün Açıklaması">
		<div class="alert alert-danger" *ngIf="productAddForm.get('description').hasError('required') && productAddForm.get('description').dirty">Ürün açıklaması zorunludur.</div>
	</div>
	<div class="form-group">
		<input type="text" id="imageUrl" name="imageUrl" formControlName="imageUrl" class="form-control" placeholder="Ürün Resmi">
		<div class="alert alert-danger" *ngIf="productAddForm.get('imageUrl').hasError('required') && productAddForm.get('imageUrl').dirty">Fotoğraf Yolu zorunludur.</div>
	</div>
	<div class="form-group">
		<input type="text" id="price" name="price" formControlName="price" class="form-control" placeholder="Ürün Fiyatı">
		<div class="alert alert-danger" *ngIf="productAddForm.get('price').hasError('required') && productAddForm.get('price').dirty">Ürün Fiyatı zorunludur.</div>
	</div>
  <div class="form-group">
		<select formControlName="categoryId" name="categoryId" id="categoryId" required class="form-control">
			<option *ngFor="let category of categories" [value]="category.id">{{category.name}}</option>
		</select>
		<div *ngIf="productAddForm.get('categoryId').hasError('required') && productAddForm.get('categoryId').touched" class="alert alert-danger">Kategori Gereklidir.</div>
    </div>
    <button type="submit" class="btn btn-primary" [disabled]="productAddForm.invalid">Ürün Ekle</button>
</form>
```