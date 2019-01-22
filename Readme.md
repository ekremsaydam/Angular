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






