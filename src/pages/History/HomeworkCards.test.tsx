import { it, describe, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HomeworkCards } from "./HomeworkCards";
import '@testing-library/jest-dom'

describe('homework cards', () => {
  it('renders homework cards', () => {
    const homework = [
      {
        id: '1',
        title: 'math homework',
        text: 'Solve x + 2 = 5',
        messages:[],
        timestamp: new Date().toISOString()
      }
    ];

    const handleHistoryCardClick = vi.fn();

    render(<HomeworkCards
      recentHomework={homework}
      handleHistoryCardClick={handleHistoryCardClick} />);

    expect(
      screen.getByText('math homework')
    ).toBeInTheDocument();
    
    expect(
      screen.getByText(/Solve x \+ 2 = 5/i)
    ).toBeInTheDocument();

    expect(
      screen.getAllByTestId('homework-card')
    ).toHaveLength(1);
  });

  it('calls a handler when a card is clicked', () => {
       const homework = [
      {
        id: '1',
        title: 'math homework',
        text: 'Solve x + 2 = 5',
        messages:[],
        timestamp: new Date().toISOString()
      }
    ];

    const handleHistoryCardClick = vi.fn();

    render(<HomeworkCards
      recentHomework={homework}
      handleHistoryCardClick={handleHistoryCardClick} />);

      fireEvent.click(screen.getByText('math homework'));

      expect(handleHistoryCardClick).toBeCalledTimes(1);

      expect(handleHistoryCardClick).toBeCalledWith(homework[0]);

  })
})