import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  todoId: number;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.todoId = params['id'];
    });
  }

  onBack() {
    this.router.navigate(['/todos']);
  }
}
