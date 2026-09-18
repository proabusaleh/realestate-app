const KEY = "dreamestate_recent";
const MAX_RECENT = 8;

export function getRecentIds() {
  try {
    const stored = localStorage.getItem(KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

export function recordView(id) {
  try {
    const ids = getRecentIds().filter((v) => v !== id);
    localStorage.setItem(KEY, JSON.stringify([id, ...ids].slice(0, MAX_RECENT)));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function clearRecent() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
