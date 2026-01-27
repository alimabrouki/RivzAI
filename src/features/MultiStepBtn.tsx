import '../styles/index.css'
import '../styles/header/Header.css'
import '../styles/home-page/HomePage.css'
import { useState } from 'react'
import { Dot } from 'lucide-react';

export const MultiStepBtn = () => {
  const [clicked, setClicked] = useState(false);
  const btnClicked = () => {
    setClicked(!clicked)
  }
 
  const dotOn: React.CSSProperties = {
    position: clicked ? 'absolute' : undefined,
    color: clicked ? 'var(--c-neutral-0)' : undefined,
    right: clicked ? '-15px' : undefined,
    top: clicked ? '-16px' : undefined
  }
  return (
    <button onClick={() => {
      btnClicked()
    }} type='button' className={`multi-step-mode ${clicked ? 'multi-step-mode-on' : ''}` }>
      Multi-Step Mode
      <Dot className={`dot-off ${clicked ? 'dot-off' : ''}`} style={dotOn} size={50} />
    </button>
  )
}