export function readJson(key, fallbackValue) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallbackValue
    return JSON.parse(raw)
  } catch {
    return fallbackValue
  }
}

export function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // If storage is unavailable (privacy mode), fail silently.
  }
}

