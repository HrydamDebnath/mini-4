import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import { generateId } from "../../utils/helpers.js";
import TodoForm from "./TodoForm.jsx";
import TodoFilter from "./TodoFilter.jsx";
import TodoItem from "./TodoItem.jsx";
import EmptyState from "../common/EmptyState.jsx";

const EMPTY_MESSAGES = {
  all: { title: "Nothing on your list", message: "Add your first task above and start ticking things off." },
  pending: { title: "All caught up", message: "No pending tasks. Enjoy the quiet." },
  completed: { title: "Nothing completed yet", message: "Finished tasks will show up here." },
};

const TodoApp = () => {
  const [tasks, setTasks] = useLocalStorage("focusdesk.tasks", []);
  const [filter, setFilter] = useState("all");

  // --- CRUD handlers (immutable updates with spread / map / filter) ---
  const addTask = ({ text, due }) =>
    setTasks((prev) => [{ id: generateId(), text, due, completed: false, createdAt: Date.now() }, ...prev]);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const editTask = (id, updates) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.completed));

  // --- Derived data ---
  const completedCount = tasks.filter((t) => t.completed).length;
  const counts = {
    all: tasks.length,
    pending: tasks.length - completedCount,
    completed: completedCount,
  };
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const visibleTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const { title, message } = EMPTY_MESSAGES[filter];

  return (
    <section className="panel todo">
      <div className="panel__head">
        <div>
          <h1 className="panel__title">Today's tasks</h1>
          <p className="panel__sub">
            {tasks.length === 0
              ? "Plan your day, one task at a time."
              : `${completedCount} of ${tasks.length} done`}
          </p>
        </div>
        <div className="progress-ring" style={{ "--p": progress }} aria-label={`${progress}% complete`}>
          <span>{progress}%</span>
        </div>
      </div>

      <TodoForm onAdd={addTask} />

      <div className="toolbar">
        <TodoFilter current={filter} counts={counts} onChange={setFilter} />
        {completedCount > 0 && (
          <button type="button" className="btn btn--ghost" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>

      {visibleTasks.length > 0 ? (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={editTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      ) : (
        <EmptyState title={title} message={message} />
      )}
    </section>
  );
};

export default TodoApp;
