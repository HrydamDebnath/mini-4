# Focus Desk – To-Do App + Notes App (React)

Week 04 Minor Project: two React apps in one polished workspace. Switch between **Tasks** and **Notes** using the top navigation.

## Project Overview
Focus Desk is built with React functional components, props, and hooks. Both apps save data in the browser using `localStorage`, so nothing is lost on refresh.

## Features Implemented

### To-Do App
- Add, edit (inline), and delete tasks
- Mark tasks completed / pending with a visible status badge
- Filter: All / Pending / Completed (with live counts)
- Due dates with overdue highlighting
- Progress ring and "Clear completed" action
- Local Storage persistence

### Notes App
- Create, edit, and delete notes
- Responsive card grid layout
- Search by title or content
- Categories (Personal, Work, Study, Ideas) with category filter
- Created / edited timestamps
- Local Storage persistence

### Both
- Fully responsive (mobile and desktop)
- Keyboard accessible (Enter to save, Esc to cancel while editing a task)

## React & JavaScript Concepts Demonstrated
- Functional components, JSX, props, component reusability (`NoteForm` handles create and edit)
- `useState`, `useEffect`, and a custom hook (`useLocalStorage`)
- Event handling, conditional rendering, list rendering with `.map()`
- Arrow functions, template literals, destructuring, spread operator, `let`/`const`
- `map()`, `filter()`, `find()`, immutable object updates

## Technologies Used
React 18 · Vite · JavaScript (ES6+) · CSS3 (Grid, Flexbox, custom properties)

## Setup Instructions
```bash
git clone <your-repo-url>
cd focus-desk
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

Build for production: `npm run build`

## Project Structure
```
src/
├── components/
│   ├── common/   Navbar, Icon, EmptyState
│   ├── todo/     TodoApp, TodoForm, TodoFilter, TodoItem
│   └── notes/    NotesApp, NoteForm, NoteCard
├── hooks/        useLocalStorage.js
├── utils/        helpers.js
├── styles/       index.css, todo.css, notes.css
├── App.jsx
└── main.jsx
```

## Screenshots
_Add screenshots here._
