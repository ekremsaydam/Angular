import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  todos: Todo[] = [];
  errorMessage: string;
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    }, (error: Response) => {
      this.errorMessage = error.url;
      console.log(this.errorMessage);
    });
  }

}
