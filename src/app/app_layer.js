import { Project } from "../domain/project";
export class App_layer {
  addTodo() {
    const project = new Project();
    project.addTodo()
  }
}
