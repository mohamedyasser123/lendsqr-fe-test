import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onPageChange = vi.fn();
  const onLimitChange = vi.fn();

  it("disables previous button on the first page", () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        totalItems={50}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: /Go to previous page/i });
    const nextButton = screen.getByRole("button", { name: /Go to next page/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("disables next button on the last page", () => {
    render(
      <Pagination
        page={5}
        totalPages={5}
        totalItems={50}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: /Go to previous page/i });
    const nextButton = screen.getByRole("button", { name: /Go to next page/i });

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it("clicking page numbers changes the current page", () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        totalItems={50}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );

    const page3Button = screen.getByRole("button", { name: /Go to page 3/i });
    expect(page3Button).toBeInTheDocument();

    fireEvent.click(page3Button);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("changing the page size (limit) calls the correct callback", () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        totalItems={50}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );

    const select = screen.getByRole("combobox", { name: /Showing/i });
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "50" } });
    expect(onLimitChange).toHaveBeenCalledWith(50);
  });
});
