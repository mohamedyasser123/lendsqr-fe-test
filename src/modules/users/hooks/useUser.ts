import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/users.service";
import {
  getCachedUser,
  setCachedUser,
} from "@/utils/userCache";
import type { User } from "../types/user.types";

export const useUser = (id: string) => {
  // Read any previously-persisted user from localStorage.
  // Passed as `initialData` so React Query serves it synchronously
  // on the first render — no loading spinner on repeat visits.
  const cachedUser = id ? getCachedUser(id) : null;

  const query = useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    // Seed the cache with whatever is already in localStorage so the
    // page is usable immediately while the background fetch runs.
    initialData: cachedUser ?? undefined,
    // Treat initialData as stale so React Query still fetches fresh
    // data in the background even when a cache hit is present.
    initialDataUpdatedAt: 0,
  });

  // Persist fresh API data back to localStorage whenever it arrives.
  useEffect(() => {
    if (query.data) {
      setCachedUser(id, query.data);
    }
  }, [id, query.data]);

  // ── Offline / API-failure with cached data ────────────────────────
  // If the query errored but we still have a cached user, surface the
  // cached data instead of an error state.  We leave all other query
  // fields untouched so callers keep their refetch / status helpers.
  if (query.isError && cachedUser) {
    return {
      ...query,
      data: cachedUser,
      isError: false,
      error: null,
      status: "success",
    } as unknown as typeof query;
  }

  return query;
};