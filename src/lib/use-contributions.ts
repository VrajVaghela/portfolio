import { useEffect, useState } from "react";

export interface Contributions {
  days: number[];
  endDate: string;
  totalYear: number;
}

let cache: Promise<Contributions | null> | null = null;

function load(user: string) {
  cache ??= fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
    .then((r) => (r.ok ? r.json() : null))
    .then((json: { total: { lastYear: number }; contributions: { date: string; count: number }[] } | null) => {
      if (!json?.contributions?.length) return null;
      const list = json.contributions;
      return {
        days: list.map((d) => d.count),
        endDate: list[list.length - 1].date,
        totalYear: json.total.lastYear,
      };
    })
    .catch(() => null);
  return cache;
}

export function useContributions(user: string) {
  const [data, setData] = useState<Contributions | null>(null);
  useEffect(() => {
    let alive = true;
    load(user).then((d) => alive && setData(d));
    return () => {
      alive = false;
    };
  }, [user]);
  return data;
}
