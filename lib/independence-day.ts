/**
 * Independence Day 2026 Season Feature Flag & Configuration
 * Standard visits default to original theme when INDEPENDENCE_DAY_THEME is false.
 * Opening with URL parameter ?theme=independence activates the Independence Day experience!
 */

// Default toggle (set to false so live site defaults to original theme)
export const INDEPENDENCE_DAY_THEME = false;

/**
 * Checks if URL contains ?theme=independence or ?theme=id2026
 */
export function checkIsIndependenceDayPreview(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get("theme");
  return themeParam === "independence" || themeParam === "id2026" || themeParam === "true";
}

export function checkIsIndependenceDaySeason(): boolean {
  if (INDEPENDENCE_DAY_THEME) return true;
  if (checkIsIndependenceDayPreview()) return true;
  return false;
}

export const IS_INDEPENDENCE_DAY_SEASON = checkIsIndependenceDaySeason();
