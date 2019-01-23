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