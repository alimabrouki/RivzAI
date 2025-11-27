import '../styles/index.css'
import '../styles/Header.css'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="head">
          <div className="header-link">
            <img className='logo' src="/src/assets/images/logo.png" alt="" />
            <span className="logo-name">Rivz<span className="logo-ai-name">AI</span></span>
          </div>
          <div className="header-links-list">
            

              <Link to="/history">
                History
              </Link>


              <Link to="/settings">
                Settings
              </Link>

              <div className="dark-mode">
                <img src="/src/assests/images/dark(1).svg" alt="" />
              </div>
            
          </div>
        </div>

      </div>
    </div>
  )
}