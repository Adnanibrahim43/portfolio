import { useEffect, useState } from "react";

const CACHE_MINUTES = 10;

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { time, data } = JSON.parse(raw);
    return Date.now() - time < CACHE_MINUTES * 60 * 1000 ? data : null;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ time: Date.now(), data }));
  } catch {
    // Storage can be blocked; the site still works without a cache
  }
}

// Reads PUBLIC data from GitHub's API (no key needed, limited to ~60 requests/hour per visitor).
export function useGithub(username) {
  const [state, setState] = useState({ status: "loading", repos: null, events: [] });

  useEffect(() => {
    const cacheKey = `github:${username}`;
    const cached = readCache(cacheKey);
    const controller = new AbortController();

    async function load() {
      if (cached) {
        setState({ status: "ready", ...cached });
        return;
      }

      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
            signal: controller.signal,
          }),
        ]);
        if (!userRes.ok || !eventsRes.ok) throw new Error("GitHub API error");

        const user = await userRes.json();
        const rawEvents = await eventsRes.json();

        const data = {
          repos: user.public_repos,
          events: rawEvents.slice(0, 6).map((event) => ({
            id: event.id,
            type: event.type,
            repo: event.repo.name.split("/")[1] ?? event.repo.name,
            time: event.created_at,
          })),
        };

        writeCache(cacheKey, data);
        setState({ status: "ready", ...data });
      } catch (error) {
        if (error.name !== "AbortError") {
          setState({ status: "error", repos: null, events: [] });
        }
      }
    }

    load();
    return () => controller.abort();
  }, [username]);

  return state;
}