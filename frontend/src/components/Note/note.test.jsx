import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Note from "./note";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";

jest.mock("axios");

const mockNotes = [
  {
    _id: "1",
    title: "Note 1",
    content: "<p>Content 1</p>",
    isFavorite: false,
    updatedAt: new Date().toISOString(),
  },
];

describe("Note Component", () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({ data: mockNotes });

    await act(async () => {
      render(
        <MemoryRouter>
          <Note />
        </MemoryRouter>
      );
    });
  });

  it("renders notes on mount", () => {
    expect(screen.getByText("Note 1")).toBeInTheDocument();
  });

  it("opens the note creation popup", () => {
    fireEvent.click(screen.getByText("+ Create Note"));
    expect(screen.getByText("New Note")).toBeInTheDocument();
  });

  it("filters notes by search term", () => {
    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "Note 1" },
    });
    expect(screen.getByText("Note 1")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "Nonexistent" },
    });
    expect(screen.queryByText("Note 1")).not.toBeInTheDocument();
  });

  it("toggles favorite notes", async () => {
    axios.put.mockResolvedValue({
      data: { ...mockNotes[0], isFavorite: true },
    });

    const heartIcon = screen.getByTestId("favorite-toggle-1"); 
    fireEvent.click(heartIcon);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
    });
  });

  it("shows delete confirmation and deletes note", async () => {
    fireEvent.click(screen.getByText("Delete"));

    expect(
      screen.getByText("Are you sure you want to delete this note?")
    ).toBeInTheDocument();

    axios.delete.mockResolvedValue({});

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[1]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:5000/api/notes/1",
        expect.anything()
      );
    });
  });
});
