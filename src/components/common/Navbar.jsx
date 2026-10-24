import Icon from "./Icon.jsx";

const Navbar = ({ tabs, activeTab, onChange }) => (
  <header className="navbar">
    <div className="navbar__inner">
      <div className="brand">
        <span className="brand__mark">
          <Icon name="check" size={20} />
        </span>
        <span className="brand__name">Focus Desk</span>
      </div>

      <nav className="tabs" aria-label="Switch app">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            className={`tab ${activeTab === id ? "tab--active" : ""}`}
            onClick={() => onChange(id)}
            aria-current={activeTab === id ? "page" : undefined}
          >
            <Icon name={icon} size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  </header>
);

export default Navbar;
