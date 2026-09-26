import { it, describe, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PromptBox } from "./PromptBox";
import { MemoryRouter } from "react-router-dom";

describe("prompt box", () => {
  it("saves a prompt into history", () => {
    render(
      <MemoryRouter>
        <PromptBox />
      </MemoryRouter>,
    );

    const promptBoxInput = screen.getByTestId("promptBoxInput");

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
