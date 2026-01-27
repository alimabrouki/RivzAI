import '../styles/index.css';
import '../styles/header/Header.css';
import '../styles/home-page/HomePage.css';
import { useRef, useState, type MouseEvent } from 'react'

type SolveItBtnProps = {
  submit: () => void
}

export const SolveItBtn = ({ submit }: SolveItBtnProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const solveIt = useRef<HTMLButtonElement | null>(null)


  const handleMouseMove = (e: MouseEvent) => {
    if (!solveIt.current) return;


    const solveItBtn = solveIt.current;
    const rect = solveItBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const maxMove = 15;
    const strength = 0.3;

    setPosition({
      x: Math.max(-maxMove, Math.min(maxMove, deltaX * strength)),
      y: Math.max(-maxMove, Math.min(maxMove, deltaY * strength))
    });
  }
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  }

  return (
    <div className="submit-btn">
      <button onClick={() => submit()} data-testid='solve-it' className='solve-it' ref={solveIt} type="button" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}>
        Solve It
      </button>
    </div>
  )
}