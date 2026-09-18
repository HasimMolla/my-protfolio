"use client";

import { useCallback, useRef, useState } from "react";
import { Eraser, Undo2 } from "lucide-react";
import { VIEWBOX, isBlank, roundPath, strokeToPath } from "@/lib/signatures";

/**
 * A draw-your-own-signature surface.
 *
 * Renders live SVG rather than a <canvas>: the strokes are already the shape we
 * want to store, so there's no raster-to-vector step, and they inherit theme
 * colour for free.
 *
 * Pointer events (not mouse/touch pairs) mean mouse, finger and stylus all work
 * from one code path, and setPointerCapture keeps a stroke alive if the pointer
 * leaves the box mid-flourish.
 */
export function SignaturePad({ onChange, disabled = false }) {
  const svgRef = useRef(null);
  const [strokes, setStrokes] = useState([]);
  const [current, setCurrent] = useState([]);
  const drawing = useRef(false);

  const pointFrom = useCallback((event) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    // Map client px into the fixed viewBox so every signature is stored in the
    // same coordinate space regardless of screen size.
    return {
      x: ((event.clientX - rect.left) / rect.width) * VIEWBOX.width,
      y: ((event.clientY - rect.top) / rect.height) * VIEWBOX.height,
    };
  }, []);

  const commit = useCallback(
    (nextStrokes) => {
      setStrokes(nextStrokes);
      onChange?.(nextStrokes);
    },
    [onChange],
  );

  function handleDown(event) {
    if (disabled) return;
    const point = pointFrom(event);
    if (!point) return;
    drawing.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setCurrent([point]);
  }

  function handleMove(event) {
    if (!drawing.current) return;
    const point = pointFrom(event);
    if (!point) return;
    setCurrent((points) => {
      const last = points[points.length - 1];
      // Drop samples that barely moved — fewer points, smoother curve.
      if (last && Math.hypot(point.x - last.x, point.y - last.y) < 1.5) {
        return points;
      }
      return [...points, point];
    });
  }

  function handleUp(event) {
    if (!drawing.current) return;
    drawing.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setCurrent((points) => {
      if (points.length) commit([...strokes, points]);
      return [];
    });
  }

  function undo() {
    commit(strokes.slice(0, -1));
  }

  function clear() {
    commit([]);
    setCurrent([]);
  }

  const hasInk = strokes.length > 0 || current.length > 0;

  return (
    <div>
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          role="img"
          aria-label="Signature drawing area. Draw with a mouse, finger or stylus."
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          onPointerCancel={handleUp}
          className={`h-44 w-full touch-none rounded-xl border border-line bg-surface ${
            disabled ? "cursor-not-allowed opacity-60" : "cursor-crosshair"
          }`}
        >
          {/* Ruled line, so people know where to sign. */}
          <line
            x1="40"
            y1={VIEWBOX.height - 52}
            x2={VIEWBOX.width - 40}
            y2={VIEWBOX.height - 52}
            stroke="currentColor"
            strokeWidth="1"
            className="text-line"
          />
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text"
          >
            {strokes.map((stroke, i) => (
              <path key={i} d={strokeToPath(stroke)} />
            ))}
            {current.length > 0 ? <path d={strokeToPath(current)} /> : null}
          </g>
        </svg>

        {!hasInk ? (
          <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-faint">
            Sign here
          </p>
        ) : null}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={undo}
          disabled={!strokes.length}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text disabled:pointer-events-none disabled:opacity-40"
        >
          <Undo2 size={13} />
          Undo
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={!hasInk}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text disabled:pointer-events-none disabled:opacity-40"
        >
          <Eraser size={13} />
          Clear
        </button>
      </div>
    </div>
  );
}

/** Flattens the pad's strokes into one storable path string. */
export function strokesToPathData(strokes) {
  if (isBlank(strokes)) return null;
  return roundPath(strokes.map(strokeToPath).join(" "));
}
