## About

A structured To-Do application built with a 3-layer architecture (Domain, Application, DOM) as part of The Odin Project.

## ⚙️ Features

- Create and manage projects
- Add, edit, and delete todos
- Project-based organization
- Persistent state using localStorage

## 🏗️ Architecture

This project intentionally separates concerns:
- Domain layer → business logic (Project, Todo)
- Application layer → state management and orchestration
- DOM layer → UI rendering and event handling

## 💾 Persistence

Data is serialized into plain objects before saving to localStorage, and reconstructed into domain instances on load.

## 🚧 Future Improvements
- Mark todos as complete
- Persist selected project
- Improve UI/UX and visual feedback

## 📚 What I learned

- Managing application state without leaking domain objects
- Separating UI from business logic
- Handling serialization/deserialization with localStorage