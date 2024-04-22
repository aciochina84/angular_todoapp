import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../Model/Todo';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http: HttpClient = inject(HttpClient);
  apiUrl = 'http://localhost:3000/api/todo';

  CreateTodo(todo: Todo) {
    return this.http.post(this.apiUrl, todo);
  }

  GetAllTodos(showCompleted: boolean = false): Observable<Todo[]> {
    const url = `${this.apiUrl}?showCompleted=${showCompleted}`;
    return this.http.get<Todo[]>(url).pipe(
      map((todos) =>
        todos.map((todo) => {
          return {
            ...todo,
            id: todo.id,
          };
        })
      )
    );
  }

  MarkTodo(id: string, check: boolean) {
    const url = `${this.apiUrl}/${id}?check=${check}`;
    return this.http.patch(url, {});
  }
}
