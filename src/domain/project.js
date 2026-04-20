import { Todo } from "../domain/todo";
export class Project {
  static counter = 0;
  stored_todos = [];
  #ID;
  #name;
  constructor(name) {
    if (typeof name !== "string" || name.trim() == "") {
      throw new TypeError("Project name must be a string!");
    }
    Project.counter += 1;
    this.#ID = Project.counter;
    this.#name = name.trim();
  }

  get name() {
    return this.#name;
  }
  get id() {
    return this.#ID;
  }
  addTodo(title, description, date, priority) {
    const todo = new Todo(title, description, date, priority);
    this.stored_todos.push(todo);
  }
  removeTodo(todo_id) {
    const remove = this.stored_todos.findIndex((todo) => todo.ID === todo_id);
    if (remove !== -1) {
      this.stored_todos.splice(remove, 1);
    }
  }
  listAllTodos() {
    console.log(this.stored_todos);
  }
  editTodo(title, description, date, priority, todo) {
    todo.title = title;
    todo.description = description;
    todo.dueDate = date;
    todo.priority = priority;
  }
  getSelectedProjectTodos() {
    // give out the stored todos on function call
    return this.stored_todos;
  }
}
