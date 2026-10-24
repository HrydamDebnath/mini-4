import { useState, useEffect } from "react";
import Icon from "../common/Icon.jsx";

export const CATEGORIES = ["Personal", "Work", "Study", "Ideas"];

const EMPTY_NOTE = { title: "", content: "", category: CATEGORIES[0] };

/**
 * Reusable for creating AND editing.
 * When `editingNote` is provided the form fills with its values.
 */
const NoteForm = ({ editingNote, onSubmit, onCancel }) => {
  const [form, setForm] = useState(EMPTY_NOTE);
  const isEditing = Boolean(editingNote);

  // Sync the form whenever the note being edited changes
  useEffect(() => {
    setForm(editingNote ? { ...editingNote } : EMPTY_NOTE);
  }, [editingNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() && !form.content.trim()) return;
    onSubmit({
      title: form.title.trim() || "Untitled note",
      content: form.content.trim(),
      category: form.category,
    });
    setForm(EMPTY_NOTE);
  };

  return (
    <form className={`note-form ${isEditing ? "note-form--editing" : ""}`} onSubmit={handleSubmit}>
      <h2 className="note-form__title">{isEditing ? "Edit note" : "New note"}</h2>

      <input
        className="input"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        maxLength={60}
        aria-label="Note title"
      />

      <textarea
        className="input input--area"
        name="content"
        placeholder="Write something worth remembering…"
        value={form.content}
        onChange={handleChange}
        rows={6}
        aria-label="Note content"
      />

      <div className="chip-row" role="radiogroup" aria-label="Category">
        {CATEGORIES.map((cat) => (
          <label key={cat} className={`chip chip--select ${form.category === cat ? "chip--on" : ""}`} data-category={cat}>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={form.category === cat}
              onChange={handleChange}
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="note-form__actions">
        <button
          className="btn btn--primary"
          type="submit"
          disabled={!form.title.trim() && !form.content.trim()}
        >
          <Icon name={isEditing ? "save" : "plus"} />
          {isEditing ? "Save changes" : "Add note"}
        </button>
        {isEditing && (
          <button className="btn btn--ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
