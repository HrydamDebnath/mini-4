const FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
];

const TodoFilter = ({ current, counts, onChange }) => (
  <div className="segmented" role="group" aria-label="Filter tasks">
    {FILTERS.map(({ id, label }) => (
      <button
        key={id}
        type="button"
        className={`segmented__btn ${current === id ? "segmented__btn--active" : ""}`}
        onClick={() => onChange(id)}
        aria-pressed={current === id}
      >
        {label}
        <span className="segmented__count">{counts[id]}</span>
      </button>
    ))}
  </div>
);

export default TodoFilter;
