import Icon from "../common/Icon.jsx";
import { formatTimestamp } from "../../utils/helpers.js";

const NoteCard = ({ note, isActive, onEdit, onDelete }) => {
  const { id, title, content, category, createdAt, updatedAt } = note;
  const wasEdited = updatedAt && updatedAt !== createdAt;

  return (
    <article className={`note-card ${isActive ? "note-card--active" : ""}`} data-category={category}>
      <header className="note-card__head">
        <span className="chip" data-category={category}>{category}</span>
        <div className="note-card__actions">
          <button className="icon-btn" onClick={() => onEdit(id)} aria-label={`Edit note ${title}`} type="button">
            <Icon name="edit" size={16} />
          </button>
          <button className="icon-btn icon-btn--danger" onClick={() => onDelete(id)} aria-label={`Delete note ${title}`} type="button">
            <Icon name="trash" size={16} />
          </button>
        </div>
      </header>

      <h3 className="note-card__title">{title}</h3>
      {content && <p className="note-card__content">{content}</p>}

      <footer className="note-card__foot">
        <Icon name="clock" size={13} />
        <time>
          {wasEdited ? `Edited ${formatTimestamp(updatedAt)}` : formatTimestamp(createdAt)}
        </time>
      </footer>
    </article>
  );
};

export default NoteCard;
