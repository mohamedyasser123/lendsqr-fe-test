import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FilterDropdown from "./FilterDropdown";

const mockFilters = {
  organization: "",
  username: "",
  email: "",
  phoneNumber: "",
  status: "",
  date: "",
};

describe("FilterDropdown Component", () => {
  const onFilterChange = vi.fn();
  const onApply = vi.fn();
  const onReset = vi.fn();
  const onClose = vi.fn();

  it("renders all inputs and selects correctly", () => {
    render(
      <FilterDropdown
        filters={mockFilters}
        onFilterChange={onFilterChange}
        onApply={onApply}
        onReset={onReset}
        onClose={onClose}
      />
    );

    expect(screen.getByLabelText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Filter/i })).toBeInTheDocument();
  });

  it("calls onFilterChange when updating inputs", () => {
    render(
      <FilterDropdown
        filters={mockFilters}
        onFilterChange={onFilterChange}
        onApply={onApply}
        onReset={onReset}
        onClose={onClose}
      />
    );

    // Organization select
    fireEvent.change(screen.getByLabelText(/Organization/i), { target: { value: "Lendsqr" } });
    expect(onFilterChange).toHaveBeenCalledWith("organization", "Lendsqr");

    // Username input
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "john_doe" } });
    expect(onFilterChange).toHaveBeenCalledWith("username", "john_doe");

    // Email input
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john@example.com" } });
    expect(onFilterChange).toHaveBeenCalledWith("email", "john@example.com");

    // Date input
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: "2023-01-01" } });
    expect(onFilterChange).toHaveBeenCalledWith("date", "2023-01-01");

    // Phone input
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: "08012345678" } });
    expect(onFilterChange).toHaveBeenCalledWith("phoneNumber", "08012345678");

    // Status select
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: "Active" } });
    expect(onFilterChange).toHaveBeenCalledWith("status", "Active");
  });

  it("calls onApply and onClose when clicking Filter button", () => {
    render(
      <FilterDropdown
        filters={mockFilters}
        onFilterChange={onFilterChange}
        onApply={onApply}
        onReset={onReset}
        onClose={onClose}
      />
    );

    const filterBtn = screen.getByRole("button", { name: /Filter/i });
    fireEvent.click(filterBtn);

    expect(onApply).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onReset and onClose when clicking Reset button", () => {
    render(
      <FilterDropdown
        filters={mockFilters}
        onFilterChange={onFilterChange}
        onApply={onApply}
        onReset={onReset}
        onClose={onClose}
      />
    );

    const resetBtn = screen.getByRole("button", { name: /Reset/i });
    fireEvent.click(resetBtn);

    expect(onReset).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
