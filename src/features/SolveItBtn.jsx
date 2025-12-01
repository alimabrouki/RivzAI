import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'

export function SolveItBtn() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const solveIt = useRef(null)


  const handleMouseMove = (e) => {
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
      <Link to="/results">
      <button className='solve-it' ref={solveIt} type="submit" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}>
        Solve It
      </button>
      </Link>
    </div>
  )
}