import axios from "axios";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./profile";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Profile", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders loading initially", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays user info after API call", async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: "User", email: "user@example.com" },
    });

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Name:/)).toBeInTheDocument();
      expect(screen.getByText("User")).toBeInTheDocument();
      expect(screen.getByText(/Email:/)).toBeInTheDocument();
      expect(screen.getByText("user@example.com")).toBeInTheDocument();
    });
  });

  it("logout clears token and redirects", async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: "User", email: "user@example.com" },
    });

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Wait for logout button to appear and click it
    await waitFor(() => {
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(
        screen.getByText("Are you sure you want to logout?")
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Yes")); 

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBeNull(); 
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  it("back to notes navigates to note-dashboard", async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: "User", email: "user@example.com" },
    });

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Back to Notes")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Back to Notes"));
    expect(mockNavigate).toHaveBeenCalledWith("/note-dashboard");
  });
});
