"use strict";

import {
  createProjectRequest,
  createTodoRequest,
  getStoredProjectsRequest,
  selectProjectRequest,
  getSelectedProjectTodosRequest,
  selectDemoProjectRequest,
} from "../app/app_layer";

function renderProjectsList() {
  const projectView = document.querySelector(".projects-view");
  projectView.innerHTML = "";

  const projects = getStoredProjectsRequest();

  projects.forEach((project) => {
    const btn = document.createElement("button");
    btn.textContent = project.name;

    btn.addEventListener("click", () => {
      selectProjectRequest(project.id); // select a project
      renderTodos();
    });
    projectView.appendChild(btn);
  });
}

function renderTodos() {
  const todoView = document.querySelector(".todos-view");
  todoView.innerHTML = "";

  const todos = getSelectedProjectTodosRequest();

  todos.forEach((todo) => {
    const btn = document.createElement("div");
    btn.textContent = `${todo.title} | ${todo.dueDate} | ${todo.priority}`;
    todoView.appendChild(btn);
  });
}
export function initDOM() {
  renderProjectsList();
}

// Shared DOM logic
const cancelButtons = document.querySelectorAll(".cancel");
cancelButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    todoDialog.close();
    projectDialog.close();
  });
});

// Project dialog logic
const projectDialog = document.querySelector(".projectDialog");
const createProjectBtn = document.querySelector(".project-btn");
createProjectBtn.addEventListener("click", () => {
  projectDialog.showModal();
});

// Project form logic
const projectForm = document.querySelector(".projectForm");
projectForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop form submission

  const formData = new FormData(projectForm);
  const data = Object.fromEntries(formData);
  createProjectRequest(data.title);
  projectForm.reset();
  renderProjectsList();
  projectDialog.close();
});

// Todo dialog logic
const todoDialog = document.querySelector(".todoDialog");
const createTodoBtn = document.querySelector(".todo-btn");
createTodoBtn.addEventListener("click", () => {
  todoDialog.showModal();
});

// Todo form logic
const todoForm = document.querySelector(".todoForm");
todoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop form submission

  const formData = new FormData(todoForm);
  const data = Object.fromEntries(formData);

  createTodoRequest(data.title, data.description, data.dueDate, data.priority);
  todoForm.reset();
  renderTodos();
  todoDialog.close();
});

// Default demo project
createProjectRequest("#Demo10!@%H");
selectDemoProjectRequest();
createTodoRequest("#Demo10!@%H", "Task 1", "desc", "low", "2026-04-10");
createTodoRequest("#Demo10!@%H", "Task 2", "desc", "high", "2026-04-11");
