export const generateId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

// Today as YYYY-MM-DD in the user's local time (matches <input type="date">)
export const todayISO = () => new Date().toLocaleDateString("en-CA");

export const formatDueDate = (iso) => {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTimestamp = (ms) =>
  new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
