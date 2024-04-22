import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Todo } from '../Model/Todo';
import { TodoService } from '../Services/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  showCreateTodoForm: boolean = false;
  allTodos: Todo[] = [];
  showCompleted: boolean = false;
  check: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchAllTodos();
  }

  OpenCreateTodoForm() {
    this.showCreateTodoForm = true;
  }

  CloseCreateTodoForm() {
    this.showCreateTodoForm = false;
  }

  // refreshTodoList() {
  //   this.fetchAllTodos();
  // }

  toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
    this.fetchAllTodos();
  }

  CreateTodo(data: Todo) {
    this.todoService.CreateTodo(data).subscribe(() => {
      this.fetchAllTodos();
    });
  }

  private fetchAllTodos() {
    this.todoService.GetAllTodos(this.showCompleted).subscribe((todos) => {
      this.allTodos = todos;
    });
  }

  toggleTodoState(id: string, check: boolean, expired: boolean) {
    if (expired) {
      alert('Cannot mark expired todo');
    } else {
      this.check = !check;
      this.todoService.MarkTodo(id, this.check).subscribe(() => {
        this.fetchAllTodos();
      });
    }
  }
}
