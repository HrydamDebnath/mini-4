import { useState } from "react";
import Navbar from "./components/common/Navbar.jsx";
import TodoApp from "./components/todo/TodoApp.jsx";
import NotesApp from "./components/notes/NotesApp.jsx";

const TABS = [
  { id: "todo", label: "Tasks", icon: "list" },
  { id: "notes", label: "Notes", icon: "note" },
];

const App = () => {
  const [activeTab, setActiveTab] = useState("todo");

  return (
    <div className="app-shell">
      <Navbar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <main className="app-main">
        {activeTab === "todo" ? <TodoApp /> : <NotesApp />}
      </main>
      <footer className="app-footer">Built with React · Your data stays in your browser</footer>
    </div>
  );
};

export default App;
