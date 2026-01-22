import '../styles/index.css'
import '../styles/header/Header.css'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { HamburgerMenu } from './HamburgerMenu'

export const HeaderLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const handleHamMenu = (open) => {
    setIsOpen(open)
  }

  
  const isHistoryPage =  location.pathname === '/history';

  return (
    <>
      <div className={`wrapper ${isHistoryPage ? 'history-page' : ''}`}>
        <div className="head">
          <div className="header-link">
            <Link to="/" className='logo-link'>
              <img className='logo' src="/src/assets/images/logo.png" alt="" />
              <span className="logo-name">Rivz<span className="logo-ai-name">AI</span></span>
            </Link>
          </div>

          <div className={isOpen ? 'header-links-list-mobile' : 'header-links-list'}>

            <Link className='link' to="/teacher-mode">
              Teacher Mode
            </Link>

            <Link to="/history" className='link'>
              History
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