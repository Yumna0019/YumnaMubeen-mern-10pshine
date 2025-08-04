import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./signup";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; 

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-toastify", () => {
  const actual = jest.requireActual("react-toastify");
  return {
    ...actual,
    toast: Object.assign(jest.fn(), {
      error: jest.fn(),
      success: jest.fn(),
    }),
  };
});


jest.mock("axios");

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Signup", () => {
  beforeAll(() => {
    Storage.prototype.setItem = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form inputs and signup button", () => {
    renderWithRouter(<Signup />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("toggles password visibility when icon is clicked", () => {
    renderWithRouter(<Signup />);

    const passwordInput = screen.getByLabelText(/^password$/i);

    const toggleIcon = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    fireEvent.click(toggleIcon);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide password
    fireEvent.click(toggleIcon);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls API and navigates on successful signup", async () => {
    axios.post.mockResolvedValue({
      data: { token: "fakeToken" },
    });

    renderWithRouter(<Signup />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "User@example.com" },
    });
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/signup",
        {
          name: "User",
          email: "User@example.com",
          password: "123456",
        }
      );
      expect(localStorage.setItem).toHaveBeenCalledWith("token", "fakeToken");
      expect(mockNavigate).toHaveBeenCalledWith("/note-dashboard", {
        state: { toast: "Signup successfully" },
      });
    });
  });

  it("shows error toast on failed signup", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: "Email already exists" } },
    });

    renderWithRouter(<Signup />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "User@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Email already exists");
    });
  });
});
