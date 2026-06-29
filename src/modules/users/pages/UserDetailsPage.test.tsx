import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UserDetailsPage from "./UserDetailsPage";
import { MemoryRouter, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUserById } from "../services/users.service";
import type { User } from "../types/user.types";

// Mock useParams from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

// Mock getUserById service
vi.mock("../services/users.service", () => ({
  getUserById: vi.fn(),
}));

const mockUser: User = {
  id: "1",
  organization: "Lendsqr",
  username: "testuser",
  email: "test@example.com",
  phoneNumber: "08012345678",
  createdAt: "2023-01-01T00:00:00.000Z",
  status: "Active",
  profile: {
    fullName: "Test User FullName",
    phoneNumber: "08012345678",
    email: "test@example.com",
    bvn: "12345678901",
    gender: "Male",
    maritalStatus: "Single",
    children: "None",
    residenceType: "Apartment",
  },
  guarantor: {
    fullName: "Guarantor Name",
    phoneNumber: "08011111111",
    email: "g@example.com",
    relationship: "Brother",
  },
  socials: {
    facebook: "fb/test",
    instagram: "ig/test",
    twitter: "tw/test",
  },
  education: {
    level: "BSc",
    employmentStatus: "Employed",
    sector: "Fintech",
    duration: "2 years",
    officeEmail: "test@office.com",
    monthlyIncome: [100000, 200000],
    loanRepayment: "20000",
  },
};

describe("UserDetailsPage and useUser Hook Integration", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    (useParams as any).mockReturnValue({ id: "1" });

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
          staleTime: 0,
        },
      },
    });
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserDetailsPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("displays loading state while fetching", () => {
    // Return a promise that never resolves to simulate loading
    (getUserById as any).mockReturnValue(new Promise(() => {}));

    const { container } = renderComponent();

    // Verify loading skeletons are rendered
    expect(screen.getByText(/Back to Users/i)).toBeInTheDocument();
    expect(container.querySelector(".user-details-page")).toBeInTheDocument();
  });

  it("displays error state when the request fails", async () => {
    (getUserById as any).mockRejectedValue(new Error("Request failed"));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Failed to Load User/i)).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /Try Again/i })).toBeInTheDocument();
  });

  it("renders user information correctly", async () => {
    (getUserById as any).mockResolvedValue(mockUser);

    renderComponent();

    await waitFor(() => {
      // Check header/summary details using regex heading check
      expect(screen.getByRole("heading", { name: /Test User FullName/i })).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });

    // Check section details from GeneralDetailsTab
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Education and Employment/i)).toBeInTheDocument();
    expect(screen.getByText("test@office.com")).toBeInTheDocument();
  });

  it("displays cached user data from localStorage if available", async () => {
    // Put cached data into localStorage
    const cachedUser = { ...mockUser, profile: { ...mockUser.profile, fullName: "Cached User Name" } };
    localStorage.setItem("user-1", JSON.stringify(cachedUser));

    // API takes some time to respond
    (getUserById as any).mockReturnValue(new Promise((resolve) => setTimeout(() => resolve(mockUser), 100)));

    renderComponent();

    // Should immediately render the cached data even before the API returns
    expect(screen.getByRole("heading", { name: /Cached User Name/i })).toBeInTheDocument();

    // Eventually, it should update to the API data
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Test User FullName/i })).toBeInTheDocument();
    });
  });

  it("updates localStorage after a successful API response", async () => {
    (getUserById as any).mockResolvedValue(mockUser);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Test User FullName/i })).toBeInTheDocument();
    });

    // Check that localStorage was populated
    expect(localStorage.getItem("user-1")).toBe(JSON.stringify(mockUser));
  });
});
