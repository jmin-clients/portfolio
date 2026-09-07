"use client";

import { useEffect, useState } from "react";

const TIMEZONE = "America/New_York";

// Client-only real-time clock (footer colophon). Renders nothing until
// mounted so the server-rendered markup never has to guess "now" and risk a
// hydration mismatch against the client's actual clock tick.
export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: TIMEZONE,
    timeZoneName: "short",
  }).format(now);

  return <span className="tabular-nums">{time}</span>;
}
