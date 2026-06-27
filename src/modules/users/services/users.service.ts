
import { api } from "@/api/axios";
import type { User } from "../types/user.types";
import { ENDPOINTS } from "@/api/endpoints";

export interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  organization?: string;
  status?: string;
}

export interface UsersResponse {
  data: User[];
  items: number;
  pages: number;
  first: number;
  last: number;
  next: number | null;
  prev: number | null;
}

export const getUsers = async ({
  page,
  limit,
  search,
  organization,
  status,
}: GetUsersParams): Promise<UsersResponse> => {
  const { data } = await api.get(ENDPOINTS.USERS, {
    params: {
      _page: page,
      _per_page: limit,
      q: search || undefined,
      organization: organization || undefined,
      status: status || undefined,
    },
  });

  return data;
};