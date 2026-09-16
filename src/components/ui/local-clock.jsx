"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/**
 * Hasim's local time, ticking. Renders blank on the server and until mounted —
 * a clock is the one thing guaranteed to mismatch during hydration.
 */
export function LocalClock({ className = "" }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ? `${time} IST` : " "}
    </span>
  );
}
