// index.js
import { Project } from "./domain/project.js";
const test = new Project("tester project");
test.addTodo("title", "This is a description", "2/2/202X", "low");
test.addTodo("cats", "This is a description cats n dogs", "26/5/202X", "high");
console.log("list of todos: ");
test.listAllTodos();
test.removeTodo(1);
console.log("list of todos: ");
test.listAllTodos();
