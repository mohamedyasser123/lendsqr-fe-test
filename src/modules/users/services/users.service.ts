
import { api } from "@/api/axios";
import type { User } from "../types/user.types";
import { ENDPOINTS } from "@/api/endpoints";

export interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  organization?: string;
  status?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  date?: string;
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

/**
 * Fetches all users from the server once.
 * Cached separately so filter/pagination changes never re-download the full list.
 */
export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>(ENDPOINTS.USERS);
  return data;
};

/**
 * Applies client-side filtering and pagination on the cached user list.
 * No network request — operates on data passed in from cache.
 */
export const filterAndPaginateUsers = (
  allUsers: User[],
  params: GetUsersParams
): UsersResponse => {
  const { page, limit, search, organization, username, email, phoneNumber, status, date } = params;

  let filtered = allUsers;

  if (search) {
    const s = search.toLowerCase().trim();
    filtered = filtered.filter(
      (u) =>
        u.username.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.organization.toLowerCase().includes(s)
    );
  }
  if (organization) {
    const org = organization.toLowerCase().trim();
    filtered = filtered.filter((u) => u.organization.toLowerCase().includes(org));
  }
  if (username) {
    const user = username.toLowerCase().trim();
    filtered = filtered.filter((u) => u.username.toLowerCase().includes(user));
  }
  if (email) {
    const mail = email.toLowerCase().trim();
    filtered = filtered.filter((u) => u.email.toLowerCase().includes(mail));
  }
  if (phoneNumber) {
    const phone = phoneNumber.trim();
    filtered = filtered.filter((u) => String(u.phoneNumber).includes(phone));
  }
  if (status) {
    filtered = filtered.filter((u) => u.status === status);
  }
  if (date) {
    filtered = filtered.filter((u) => u.createdAt === date);
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    items: totalItems,
    pages: totalPages,
    first: 1,
    last: totalPages,
    next: safePage < totalPages ? safePage + 1 : null,
    prev: safePage > 1 ? safePage - 1 : null,
  };
};

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await api.get(`${ENDPOINTS.USERS}/${id}`);
  return data;
};