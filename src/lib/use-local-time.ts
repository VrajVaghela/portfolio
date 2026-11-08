import { useEffect, useState } from "react";

const format = (timeZone: string) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date());

export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => format(timeZone));
  useEffect(() => {
    const id = window.setInterval(() => setTime(format(timeZone)), 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}
