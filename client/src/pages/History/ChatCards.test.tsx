import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatCards } from "./ChatCards";
import "@testing-library/jest-dom";

describe("homework cards", () => {
  it("renders homework cards", () => {
    const chat = [
      {
        id: 1,
        title: "math homework",
        text: "Solve x + 2 = 5",
        messages: [],
        createdAt: new Date(),
      },
    ];

    render(<ChatCards chats={chat} />);

    expect(screen.getByText("math homework")).toBeInTheDocument();

    expect(screen.getByText(/Solve x \+ 2 = 5/i)).toBeInTheDocument();

    expect(screen.getAllByTestId("homework-card")).toHaveLength(1);
  });
});
