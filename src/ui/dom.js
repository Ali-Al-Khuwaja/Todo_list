"use strict";

import {
  createProjectRequest,
  createTodoRequest,
  getStoredProjectsRequest,
  selectProjectRequest,
  getSelectedProjectTodosRequest,
  selectDemoProjectRequest,
  deleteTodoRequest,
  editTodoRequest,
  deleteProjectRequest,
} from "../app/app_layer";

let editingTodoId = null;

function renderProjectsList() {
  const projectView = document.querySelector(".projects-view");
  projectView.innerHTML = "";

  const projects = getStoredProjectsRequest();

  projects.forEach((project) => {
    const container = document.createElement("div");
    const title = document.createElement("p");
    title.textContent = project.name;
    title.style.cssText = "margin: 0px;";
    container.style.cssText =
      "display:flex; border: 2px solid gray; border-radius: 5px; justify-content: space-between; align-items: center; padding: 16px;";
    container.addEventListener("click", () => {
      selectProjectRequest(project.id); // select a project
      renderTodos();
    });

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.onclick = (e) => {
      e.stopPropagation(); // prevent bubbling
      selectProjectRequest(project.id);
      deleteProjectRequest();
      renderProjectsList();
      renderTodos();
    };
    container.append(title, button);
    projectView.appendChild(container);
  });
}

function renderTodos() {
  const todoView = document.querySelector(".todos-view");
  todoView.innerHTML = "";

  const todos = getSelectedProjectTodosRequest();

  todos.forEach((todo) => {
    const container = document.createElement("div");
    container.style.cssText =
      "display: flex; justify-content: space-between; margin: 16px;";

    const todoInfo = document.createElement("div");
    todoInfo.textContent = `${todo.title} | ${todo.dueDate} | ${todo.priority}`;

    const btnContainer = document.createElement("div");
    btnContainer.style.cssText =
      "display: flex; justify-content: center; gap: 16px;";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      deleteTodoRequest(todo.ID);
      renderTodos();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      editingTodoId = todo.ID;

      // pre-fill form
      todoForm.title.value = todo.title;
      todoForm.description.value = todo.description;
      todoForm.dueDate.value = todo.dueDate;
      todoForm.priority.value = todo.priority;

      todoDialog.showModal();
    };

    btnContainer.append(deleteBtn, editBtn);
    container.append(todoInfo, btnContainer);
    todoView.append(container);
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

  if (editingTodoId) {
    editTodoRequest(editingTodoId, data);
    editingTodoId = null;
  } else {
    createTodoRequest(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
    );
  }
  todoForm.reset();
  renderTodos();
  todoDialog.close();
});

// Default demo project
createProjectRequest("#Demo10!@%H");
selectDemoProjectRequest();
createTodoRequest("Task 1", "desc", "2026-04-10", "low");
createTodoRequest("Task 2", "desc", "2026-04-11", "high");
//#Demo10!@%H" delete , it should not be passed
