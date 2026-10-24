import { useState } from "react";
import Icon from "../common/Icon.jsx";
import { formatDueDate, todayISO } from "../../utils/helpers.js";

const TodoItem = ({ task, onToggle, onDelete, onEdit }) => {
  const { id, text, due, completed } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ text, due });

  const isOverdue = !completed && due && due < todayISO();

  const startEditing = () => {
    setDraft({ text, due });
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = draft.text.trim();
    if (!trimmed) return;
    onEdit(id, { text: trimmed, due: draft.due });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") setIsEditing(false);
  };

  return (
    <li className={`task ${completed ? "task--done" : ""} ${isEditing ? "task--editing" : ""}`}>
      <button
        type="button"
        className="task__check"
        onClick={() => onToggle(id)}
        aria-label={completed ? "Mark as pending" : "Mark as completed"}
        aria-pressed={completed}
      >
        {completed && <Icon name="check" size={16} />}
      </button>

      {isEditing ? (
        <div className="task__edit">
          <input
            className="input"
            value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })}
            onKeyDown={handleKeyDown}
            aria-label="Edit task"
            maxLength={120}
            autoFocus
          />
          <input
            className="input input--date"
            type="date"
            value={draft.due}
            onChange={(e) => setDraft({ ...draft, due: e.target.value })}
            onKeyDown={handleKeyDown}
            aria-label="Edit due date"
          />
          <div className="task__actions task__actions--visible">
            <button className="icon-btn icon-btn--ok" onClick={saveEdit} aria-label="Save changes" type="button">
              <Icon name="check" />
            </button>
            <button className="icon-btn" onClick={() => setIsEditing(false)} aria-label="Cancel editing" type="button">
              <Icon name="x" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task__body">
            <span className="task__text">{text}</span>
            <div className="task__meta">
              <span className={`badge ${completed ? "badge--done" : "badge--pending"}`}>
                {completed ? "Completed" : "Pending"}
              </span>
              {due && (
                <span className={`task__due ${isOverdue ? "task__due--overdue" : ""}`}>
                  <Icon name="calendar" size={13} />
                  {isOverdue ? `Overdue · ${formatDueDate(due)}` : `Due ${formatDueDate(due)}`}
                </span>
              )}
            </div>
          </div>
          <div className="task__actions">
            <button className="icon-btn" onClick={startEditing} aria-label={`Edit "${text}"`} type="button">
              <Icon name="edit" />
            </button>
            <button className="icon-btn icon-btn--danger" onClick={() => onDelete(id)} aria-label={`Delete "${text}"`} type="button">
              <Icon name="trash" />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
