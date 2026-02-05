export class Todo {
  // Class variables
  static PRIORITIES = ["low", "medium", "high"];
  static counter = 0;
  // Private variables
  #title;
  #description;
  #dueDate;
  #priority;
  #ID;
  constructor(title, description, dueDate, priority) {
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (dueDate !== undefined) this.dueDate = dueDate;
    if (priority !== undefined) this.priority = priority;
    Todo.counter += 1; // This is how we call class variables in js
    this.#ID = Todo.counter;
  }

  get ID() {
    return this.#ID;
  }
  get title() {
    return this.#title;
  }

  set title(newTitle) {
    if (typeof newTitle !== "string" || newTitle === null) {
      throw new TypeError("title must be a string");
    }
    if (newTitle.length > 200) {
      throw new RangeError("title must be ≤ 200 characters");
    }
    return (this.#title = newTitle.trim());
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    if (typeof newDescription !== "string" || newDescription === null) {
      throw new TypeError("description must be a string");
    } else {
      return (this.#description = newDescription);
    }
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(newDueDate) {
    if (typeof newDueDate !== "string") {
      throw new TypeError("DueDate must be a string");
    } else {
      return (this.#dueDate = newDueDate);
    }
  }

  get priority() {
    return this.#priority;
  }

  set priority(newPriority) {
    if (typeof newPriority !== "string") {
      throw new TypeError("priority must be a string");
    }
    const p = newPriority.toLowerCase();
    if (!Todo.PRIORITIES.includes(p)) {
      throw new RangeError(`priority must be one of: ${Todo.PRIORITIES}`);
    } else {
      return (this.#priority = newPriority);
    }
  }
}
