export class Todo {
  constructor(
    public title: string,
    public dueDate: string,
    public completed: boolean,
    public expired: boolean,
    public id: string
  ) {}
}
