import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import 'rxjs/add/operator/catch';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodos(): Observable<Todo[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': btoa('admin:12345')
      })
    };

    return this.httpClient.get<Todo[]>(this.todoUrl, httpOptions).catch((error: Response) => {
      // console.log(error);
      return Observable.throw(error);
    });
  }
}
