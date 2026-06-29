import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UsersTable from "./UsersTable";
import { MemoryRouter } from "react-router-dom";
import type { User } from "../types/user.types";

const mockUsers: User[] = [
  {
    id: "1",
    organization: "Lendsqr",
    username: "user1",
    email: "user1@example.com",
    phoneNumber: "08012345678",
    createdAt: "2023-01-01T00:00:00.000Z",
    status: "Active",
    profile: {
      fullName: "User One",
      phoneNumber: "08012345678",
      email: "user1@example.com",
      avatar: "avatar1.png",
      bvn: "12345678901",
      gender: "Male",
      maritalStatus: "Single",
      children: "None",
      residenceType: "Apartment",
    },
    guarantor: {
      fullName: "Guarantor One",
      phoneNumber: "08011111111",
      email: "g1@example.com",
      relationship: "Brother",
    },
    socials: {
      facebook: "fb/user1",
      instagram: "ig/user1",
      twitter: "tw/user1",
    },
    education: {
      level: "BSc",
      employmentStatus: "Employed",
      sector: "Fintech",
      duration: "2 years",
      officeEmail: "user1@office.com",
      monthlyIncome: [100000, 200000],
      loanRepayment: "20000",
    },
  },
  {
    id: "2",
    organization: "Irorun",
    username: "user2",
    email: "user2@example.com",
    phoneNumber: "08087654321",
    createdAt: "2023-02-01T00:00:00.000Z",
    status: "Pending",
    profile: {
      fullName: "User Two",
      phoneNumber: "08087654321",
      email: "user2@example.com",
      avatar: "avatar2.png",
      bvn: "10987654321",
      gender: "Female",
      maritalStatus: "Married",
      children: "Two",
      residenceType: "Owned",
    },
    guarantor: {
      fullName: "Guarantor Two",
      phoneNumber: "08022222222",
      email: "g2@example.com",
      relationship: "Sister",
    },
    socials: {
      facebook: "fb/user2",
      instagram: "ig/user2",
      twitter: "tw/user2",
    },
    education: {
      level: "MSc",
      employmentStatus: "Unemployed",
      sector: "N/A",
      duration: "N/A",
      officeEmail: "user2@office.com",
      monthlyIncome: [0, 0],
      loanRepayment: "0",
    },
  },
];

const mockFilters = {
  organization: "",
  username: "",
  email: "",
  phoneNumber: "",
  status: "",
  date: "",
};

describe("UsersTable Component", () => {
  const onFilterChange = vi.fn();
  const onApplyFilters = vi.fn();
  const onResetFilters = vi.fn();
  const onRetry = vi.fn();

  it("renders the list of users when state is default", () => {
    render(
      <MemoryRouter>
        <UsersTable
          state="default"
          users={mockUsers}
          filters={mockFilters}
          onFilterChange={onFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
          onRetry={onRetry}
        />
      </MemoryRouter>
    );

    // Verify header exists
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Verify row data renders
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
    expect(screen.getByText("user2@example.com")).toBeInTheDocument();

    // Check statuses
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("displays loading skeleton while data is loading", () => {
    const { container } = render(
      <MemoryRouter>
        <UsersTable
          state="loading"
          users={[]}
          filters={mockFilters}
          onFilterChange={onFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </MemoryRouter>
    );

    // Skeleton elements should be rendered (tr with skeleton class)
    const skeletons = container.querySelectorAll(".users-table__tr--skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("displays the empty state when there are no users", () => {
    render(
      <MemoryRouter>
        <UsersTable
          state="empty"
          users={[]}
          filters={mockFilters}
          onFilterChange={onFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/No Users Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/There are currently no users in the database to display/i)
    ).toBeInTheDocument();
  });

  it("displays the error state when the API fails", () => {
    render(
      <MemoryRouter>
        <UsersTable
          state="error"
          users={[]}
          filters={mockFilters}
          onFilterChange={onFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
          onRetry={onRetry}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Failed to Load Users/i)).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: /Try Again/i });
    expect(retryBtn).toBeInTheDocument();

    fireEvent.click(retryBtn);
    expect(onRetry).toHaveBeenCalled();
  });
});
