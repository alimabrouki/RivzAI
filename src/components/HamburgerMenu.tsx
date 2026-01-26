import '../styles/index.css'
import '../styles/header/Header.css'
import { Menu, X } from 'lucide-react'

type HamburgerMenuProps = {
  isOpen: boolean;
  handleHamMenu: (open: boolean) => void
}

export const HamburgerMenu = ({handleHamMenu,isOpen}: HamburgerMenuProps) => {

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