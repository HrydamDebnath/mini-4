import { useState } from "react";
import Icon from "../common/Icon.jsx";

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [due, setDue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({ text: trimmed, due });
    setText("");
    setDue("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="input todo-form__text"
        type="text"
        placeholder="What needs to get done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Task description"
        maxLength={120}
      />
      <label className="todo-form__date">
        <Icon name="calendar" size={16} />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          aria-label="Due date"
        />
      </label>
      <button className="btn btn--primary" type="submit" disabled={!text.trim()}>
        <Icon name="plus" size={18} />
        Add task
      </button>
    </form>
  );
};

export default TodoForm;
