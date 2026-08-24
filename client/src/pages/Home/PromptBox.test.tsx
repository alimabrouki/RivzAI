import { it, describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PromptBox } from "./PromptBox";

describe("prompt box", () => {
  it("saves a prompt into history", () => {
    render(<PromptBox />);

    const promptBoxInput = screen.getByPlaceholderText(
      "Put your homework here, and let’s break it down together...",
    );

    const solveItBtn = screen.getByTestId("solve-it");

    fireEvent.change(promptBoxInput, {
      target: { value: "solve this homework" },
    });

    fireEvent.click(solveItBtn);

    fireEvent.keyDown(promptBoxInput, {
      key: "Enter",
      code: "Enter",
    });

    expect(solveItBtn).toBeInTheDocument();
  });
});
