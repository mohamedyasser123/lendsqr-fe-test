import { useQuery } from "@tanstack/react-query";
import {
  getUsers,
  type GetUsersParams,
} from "../services/users.service";

export const useUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: (previousData) => previousData,
  });
};