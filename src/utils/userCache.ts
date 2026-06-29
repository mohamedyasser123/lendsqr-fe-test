import type { User } from "@/modules/users/types/user.types";

const CACHE_KEY_PREFIX = "user-" as const;

/**
 * Builds the localStorage key for a given user ID.
 */
const getCacheKey = (id: string): string => `${CACHE_KEY_PREFIX}${id}`;

/**
 * Reads a cached User from localStorage.
 * Returns `null` if nothing is stored or if the stored value cannot be parsed.
 */
export const getCachedUser = (id: string): User | null => {
  try {
    const raw = localStorage.getItem(getCacheKey(id));
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    // Corrupted entry — treat as cache miss
    return null;
  }
};

/**
 * Writes a User to localStorage under the key `user-{id}`.
 * Silently no-ops if localStorage is unavailable (e.g. private browsing quota exceeded).
 */
export const setCachedUser = (id: string, user: User): void => {
  try {
    localStorage.setItem(getCacheKey(id), JSON.stringify(user));
  } catch {
    // Storage quota exceeded or access denied — ignore
  }
};

/**
 * Removes a cached User entry from localStorage.
 */
export const removeCachedUser = (id: string): void => {
  try {
    localStorage.removeItem(getCacheKey(id));
  } catch {
    // Ignore
  }
};
