import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChatCards } from "./ChatCards";
import "@testing-library/jest-dom";

describe("homework cards", () => {
  it("renders homework cards", () => {
    const chat = [
      {
        id: 1,
        title: "math homework",
        messages: [
          {
            id: 1,
            role: "user",
            content: "Solve x + 2 = 5",
          },
        ],
        createdAt: new Date(),
      },
    ];

    render(
      <MemoryRouter>
        <ChatCards chats={chat} />
      </MemoryRouter>,
    );

    expect(screen.getByText("math homework")).toBeInTheDocument();

    expect(screen.getByText(/Solve x \+ 2 = 5/i)).toBeInTheDocument();

    expect(screen.getAllByTestId("homework-card")).toHaveLength(1);
  });
});
