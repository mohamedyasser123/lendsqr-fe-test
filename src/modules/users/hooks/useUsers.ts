import { useQuery } from "@tanstack/react-query";
import {
  getAllUsers,
  filterAndPaginateUsers,
  type GetUsersParams,
} from "../services/users.service";

export const useUsers = (params: GetUsersParams) => {
  // Step 1: Fetch all users once — cached globally for 5 minutes.
  // Pagination and filter changes read from this cache, never re-downloading.
  const allUsersQuery = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000,
  });

  // Step 2: Derive filtered + paginated results from the cached user list in memory.
  // "enabled" ensures this only runs when the data is ready.
  const filteredQuery = useQuery({
    queryKey: ["users", params],
    queryFn: () => filterAndPaginateUsers(allUsersQuery.data!, params),
    enabled: !!allUsersQuery.data,
    placeholderData: (previousData) => previousData,
  });

  return {
    data: filteredQuery.data,
    isLoading: allUsersQuery.isLoading,        // true only on first-ever load
    isFetching: allUsersQuery.isFetching || filteredQuery.isFetching,
    isPlaceholderData: filteredQuery.isPlaceholderData,
    isError: allUsersQuery.isError || filteredQuery.isError,
    refetch: allUsersQuery.refetch,             // retry re-downloads from network
  };
};