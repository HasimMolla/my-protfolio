// Storage + geometry for the signature wall.
//
// Signatures are kept as SVG path data rather than raster images: they stay
// sharp at any size, inherit the theme through `currentColor`, and can be
// stroke-animated on replay. They live in localStorage for now — see
// `loadSignatures` for what changes when a real datastore is wired up.

export const STORAGE_KEY = "hasim.signature-wall.v1";
export const MAX_ENTRIES = 60;
export const NAME_MAX = 32;

// The coordinate space every signature is normalised into, so strokes drawn on
// a phone and on a desktop render at the same weight on the wall.
export const VIEWBOX = { width: 600, height: 200 };

/**
 * Turns a stroke's raw points into a smooth path.
 *
 * Joining raw points with straight lines reads as jagged at drawing speed, so
 * each segment curves through the midpoint between consecutive samples, using
 * the sample itself as the control point.
 */
export function strokeToPath(points) {
  if (!points.length) return "";
  if (points.length === 1) {
    // A tap still deserves a mark — emit a dot.
    const [p] = points;
    return `M ${p.x} ${p.y} l 0.01 0`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    d += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

/** Rounds to 1dp — halves the stored size with no visible loss at this scale. */
export function roundPath(d) {
  return d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));
}

export function isBlank(strokes) {
  return strokes.reduce((total, stroke) => total + stroke.length, 0) < 4;
}

function safeParse(raw) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/*
 * The wall as an external store.
 *
 * useSyncExternalStore needs getSnapshot to return a *stable* reference until
 * the data actually changes — parsing JSON on every call would hand React a new
 * array each render and spin forever. So the parsed value is cached here and
 * only replaced on a real mutation.
 *
 * Swapping localStorage for a real datastore means changing `read` and
 * `persist` below; nothing that renders needs to know where signatures live.
 */

// Module-level constant so the server snapshot is reference-stable.
const EMPTY = [];

let cache = null;
const listeners = new Set();

function read() {
  if (cache) return cache;
  if (typeof window === "undefined") return EMPTY;
  try {
    cache = safeParse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    // Private mode and blocked site-data both throw on access.
    cache = EMPTY;
  }
  return cache;
}

function persist(next) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Out of quota or storage blocked — the entry still shows this session.
  }
  listeners.forEach((listener) => listener());
  return next;
}

export function subscribeSignatures(onChange) {
  listeners.add(onChange);
  // Keep other tabs of the same site in sync.
  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY) return;
    cache = null;
    onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export const getSignatures = () => read();
export const getServerSignatures = () => EMPTY;

export function saveSignature(entry) {
  return persist([entry, ...read()].slice(0, MAX_ENTRIES));
}

export function removeSignature(id) {
  return persist(read().filter((entry) => entry.id !== id));
}

export function cleanName(value) {
  return value.replace(/\s+/g, " ").trim().slice(0, NAME_MAX);
}
