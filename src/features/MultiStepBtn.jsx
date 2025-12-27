import '../styles/index.css'
import '../styles/header/Header.css'
import '../styles/home-page/HomePage.css'
import { useState } from 'react'
import {Dot } from 'lucide-react';

export const MultiStepBtn = () => {
  const [clicked, setClicked] = useState(false);
  const btnClicked = () => {
    setClicked(!clicked)
  }
  const btnStyle = {
    background: clicked ? 'linear-gradient(90deg, rgb(240, 181, 2) 17%, rgba(240, 128, 0, 1) 68%, rgba(255, 162, 0, 1) 100%)' : '',
    color: clicked ? 'var(--c-neutral-0)' : '',
    fontWeight: clicked ? '500' : ''
  }
  const dotOn = {
    position: clicked ? 'absolute': '' ,
    color: clicked ? 'var(--c-neutral-0)' : '',
    right: clicked ? '-15px' : '',
    top: clicked ? '-16px' : '' 
  }
  return (
    <button onClick={() => {
      btnClicked()
    }} style={btnStyle} type='button' className='multi-step-mode'>
      Multi-Step Mode
      <Dot className='dot-on-off' style={dotOn} size={50} />

    </button>
  )
}