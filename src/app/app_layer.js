"use strict";

import "@picocss/pico/css/pico.blue.min.css";
import { Project } from "../domain/project";
let storedProjects = [];
let selectedProject = null;

export function createProjectRequest(projectName) {
  let project = new Project(projectName);
  storedProjects.push(project);

  saveProjects();
}

export function createTodoRequest(title, description, date, priority) {
  if (!selectedProject) {
    return alert("Create a project first");
  } else selectedProject.addTodo(title, description, date, priority);
}

export function getStoredProjectsRequest() {
  return storedProjects;
}
export function selectProjectRequest(id) {
  return (selectedProject = storedProjects.find(
    (project) => project.id === id,
  ));
}

export function deleteTodoRequest(id) {
  selectedProject.removeTodo(id);
}

export function editTodoRequest(id, data) {
  if (!selectedProject) return; // if not truthy do nothing

  const todo = selectedProject //select the todo
    .getSelectedProjectTodos()
    .find((t) => t.ID === id);

  if (!todo) return; // same

  selectedProject.editTodo(
    data.title,
    data.description,
    data.dueDate,
    data.priority,
    todo,
  );
}

// #Demo10!@%H what are the chances that the user will name his project this name?
export function selectDemoProjectRequest() {
  selectedProject = storedProjects.find(
    (project) => project.name === "#Demo10!@%H",
  );
}

export function getSelectedProjectTodosRequest() {
  // ask for project's todos
  if (!selectedProject) return [];
  return selectedProject.getSelectedProjectTodos();
}

export function deleteProjectRequest() {
  if (!selectedProject) return;

  const index = storedProjects.findIndex(
    (project) => project.id === selectedProject.id,
  );

  if (index !== -1) {
    storedProjects.splice(index, 1);
  }

  selectedProject = null;
}

function saveProjects() {
  const data = storedProjects.map((project) => ({
    name: project.name,
    todos: project.getSelectedProjectTodos().map((todo) => ({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
    })),
  }));

  localStorage.setItem("projects", JSON.stringify(data));
}

export function loadProjects() {
  const raw = localStorage.getItem("projects");
  if (!raw) return;

  // “Because JSON.stringify on class instances removes private fields, the
  // saved data loses essential properties like name and todo content.
  // When loading, this results in invalid data (missing name), causing
  // constructor errors and preventing reconstruction of proper Project and
  // Todo instances.”
  const data = JSON.parse(raw);

  storedProjects = data
    .map((p) => {
      if (!p.name) return null; // guard

      const project = new Project(p.name);

      p.todos.forEach((t) => {
        project.addTodo(t.title, t.description, t.dueDate, t.priority);
      });

      return project;
    })
    .filter(Boolean);
}
export function ensureDemoProject() {
  if (storedProjects.length === 0) {
    const project = new Project("#Demo10!@%H");
    storedProjects.push(project);
    selectedProject = project;

    project.addTodo("Task 1", "desc", "2026-04-10", "low");
    project.addTodo("Task 2", "desc", "2026-04-11", "high");

    saveProjects();
  }
}
// That’s the key idea:
// You are stripping your app down to pure data before saving.
