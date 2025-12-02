import '../styles/index.css'
import '../styles/Header.css'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="head">
          <div className="header-link">
            <Link to="/" className='logo-link'>
              <img className='logo' src="/src/assets/images/logo.png" alt="" />
              <span className="logo-name">Rivz<span className="logo-ai-name">AI</span></span>
            </Link>
          </div>
          <div className="header-links-list">

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
        </div>
      </div>
    </div>
  )
}