import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import { generateId } from "../../utils/helpers.js";
import NoteForm, { CATEGORIES } from "./NoteForm.jsx";
import NoteCard from "./NoteCard.jsx";
import EmptyState from "../common/EmptyState.jsx";
import Icon from "../common/Icon.jsx";

const NotesApp = () => {
  const [notes, setNotes] = useLocalStorage("focusdesk.notes", []);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  // find() locates the note currently being edited
  const editingNote = notes.find((n) => n.id === editingId) ?? null;

  const saveNote = (data) => {
    const now = Date.now();
    if (editingId) {
      setNotes((prev) => prev.map((n) => (n.id === editingId ? { ...n, ...data, updatedAt: now } : n)));
      setEditingId(null);
    } else {
      setNotes((prev) => [{ id: generateId(), ...data, createdAt: now, updatedAt: now }, ...prev]);
    }
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (id === editingId) setEditingId(null);
  };

  const startEditing = (id) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Search + category filter
  const normalizedQuery = query.trim().toLowerCase();
  const visibleNotes = notes
    .filter((n) => category === "All" || n.category === category)
    .filter(
      (n) =>
        !normalizedQuery ||
        `${n.title} ${n.content}`.toLowerCase().includes(normalizedQuery)
    );

  const isFiltering = Boolean(normalizedQuery) || category !== "All";

  return (
    <section className="notes">
      <aside className="notes__side">
        <NoteForm
          editingNote={editingNote}
          onSubmit={saveNote}
          onCancel={() => setEditingId(null)}
        />
      </aside>

      <div className="notes__main">
        <div className="panel__head panel__head--tight">
          <div>
            <h1 className="panel__title">Your notes</h1>
            <p className="panel__sub">
              {notes.length === 0
                ? "Capture ideas before they disappear."
                : `${visibleNotes.length} of ${notes.length} shown`}
            </p>
          </div>
        </div>

        <div className="search">
          <Icon name="search" size={18} />
          <input
            type="search"
            placeholder="Search by title or content"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search notes"
          />
        </div>

        <div className="chip-row chip-row--filters" role="group" aria-label="Filter by category">
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip chip--filter ${category === cat ? "chip--on" : ""}`}
              data-category={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {visibleNotes.length > 0 ? (
          <div className="note-grid">
            {visibleNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={note.id === editingId}
                onEdit={startEditing}
                onDelete={deleteNote}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={isFiltering ? "No matching notes" : "No notes yet"}
            message={
              isFiltering
                ? "Try a different search or category."
                : "Write your first note using the form."
            }
          />
        )}
      </div>
    </section>
  );
};

export default NotesApp;
