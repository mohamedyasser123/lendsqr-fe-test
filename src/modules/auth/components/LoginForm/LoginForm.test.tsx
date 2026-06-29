import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginForm from "./LoginForm";
import { useLogin } from "../../hooks/useLogin";
import { MemoryRouter } from "react-router-dom";

// Mock the useLogin hook
vi.mock("../../hooks/useLogin", () => ({
  useLogin: vi.fn(),
}));

describe("LoginForm Component", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLogin as any).mockReturnValue({
      login: mockLogin,
      isLoading: false,
    });
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /Welcome!/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /LOG IN/i })).toBeInTheDocument();
  });

  it("displays validation errors when submitting empty fields", async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const form = container.querySelector("form")!;
    fireEvent.submit(form);

    // Errors should appear (zod schema messages)
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("displays validation errors for invalid email and short password", async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const form = container.querySelector("form")!;

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("submits successfully with valid credentials", async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const form = container.querySelector("form")!;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "test@example.com",
          password: "password123",
        }),
        expect.any(Object)
      );
    });
  });

  it("disables submit button and shows loading text when isLoading is true", () => {
    (useLogin as any).mockReturnValue({
      login: mockLogin,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole("button", { name: /LOGGING IN.../i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });
});
