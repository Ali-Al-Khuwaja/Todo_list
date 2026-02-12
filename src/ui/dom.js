import { app_addTodo, app_getTodos } from "../app/app_layer";

export function initDOM() {
  const newProjectBtn = document.querySelector(".project");

  newProjectBtn.addEventListener("click", () => {
    let title = "title";
    let description = "something";
    let date = "10/2/2026";
    let priority = "low";
    app_addTodo(title, description, date, priority);
    app_getTodos();
  });
}
