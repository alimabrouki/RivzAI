import '../styles/index.css'
import '../styles/Header.css'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { HamburgerMenu } from './HamburgerMenu'

export const HeaderLinks = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleHamMenu = (open) => {
    setIsOpen(open)
  }
 
  return (
    <>
     <div className="wrapper">
        <div className="head">
          <div className="header-link">
            <Link to="/" className='logo-link'>
              <img className='logo' src="/src/assets/images/logo.png" alt="" />
              <span className="logo-name">Rivz<span className="logo-ai-name">AI</span></span>
            </Link>
          </div>
        
           <div className={isOpen ? 'header-links-list-mobile' : 'header-links-list'}>

            <Link className='link' to="/history">
              History
            </Link>

            <Link className='link' to="/settings">
              Settings
            </Link>

            <Link to="/sign-up" className='get-started-btn'>
              Get Started Free
            </Link>
            
          </div>
     
          <HamburgerMenu isOpen={isOpen} handleHamMenu={handleHamMenu} />
        </div>
        <div className={isOpen ? 'mobile-menu' : ''}></div>
      </div>
     
    </>
  )
}