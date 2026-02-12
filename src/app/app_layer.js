import { Project } from "../domain/project";
const inbox = new Project("Inbox");
export function app_addTodo(title, description, date, priority) {
  inbox.addTodo(title, description, date, priority);
}

export function app_getTodos() {
  return inbox.listAllTodos();
}
