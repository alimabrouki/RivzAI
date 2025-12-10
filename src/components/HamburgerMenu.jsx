import '../styles/index.css'
import '../styles/Header.css'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export const HamburgerMenu = ({handleHamMenu,isOpen}) => {

  const openMenu = () => {
    handleHamMenu(!isOpen)
  
  }
  const closeMenu = () => {
    handleHamMenu(false)
  
  }
  return (
    <>
      {isOpen ? <X onClick={closeMenu} className='close-menu' size={50} /> : 
       <Menu onClick={openMenu} className='open-menu'  size={40} />}
    </>
  )
}