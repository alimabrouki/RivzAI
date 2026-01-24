import { it, describe, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HomeworkCards } from "./HomeworkCards";

describe('homework cards', () => {
  it('renders homework cards', () => {
    const homework = [
      {
        id: '1',
        title: 'math homework',
        text: 'Solve x + 2 = 5',
        timeStamp: Date.now()
      }
    ];

    const handlHistoryCardClick = vi.fn();

    render(<HomeworkCards
      recentHomework={homework}
      handlHistoryCardClick={handlHistoryCardClick} />);

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
        timeStamp: Date.now()
      }
    ];

    const handlHistoryCardClick = vi.fn();

    render(<HomeworkCards
      recentHomework={homework}
      handlHistoryCardClick={handlHistoryCardClick} />);

      fireEvent.click(screen.getByText('math homework'));

      expect(handlHistoryCardClick).toBeCalledTimes(1);

      expect(handlHistoryCardClick).toBeCalledWith(homework[0]);
      
  })
})