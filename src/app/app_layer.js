"use strict";

import "@picocss/pico/css/pico.blue.min.css";
import { Project } from "../domain/project";
let storedProjects = [];
let selectedProject = null;

export function createProjectRequest(projectName) {
  let project = new Project(projectName);
  storedProjects.push(project);
}

export function createTodoRequest(title, description, date, priority) {
  selectedProject.addTodo(title, description, date, priority);
}

export function getStoredProjectsRequest() {
  return storedProjects;
}
export function selectProjectRequest(id) {
  return (selectedProject = storedProjects.find(
    (project) => project.id === id,
  ));
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
