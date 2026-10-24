const EmptyState = ({ title, message }) => (
  <div className="empty">
    <div className="empty__art" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
    <h3>{title}</h3>
    <p>{message}</p>
  </div>
);

export default EmptyState;
