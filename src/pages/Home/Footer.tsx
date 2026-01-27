import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useIntersectionAnimation } from "../../hooks/useIntersectionAnimation"
import '../../styles/hooks-styles/useIntersectionAnimation.css'
import '../../styles/home-page/Footer.css'

export const Footer = () => {
  const observe = useIntersectionAnimation({ threshold: 0.1 })
  return (
    <div ref={observe} className="footer slide-in">
      <h2 className="footer-title">Your Education Is Your Most Valuable Asset</h2>
      <p>Build it now — for free.</p>
      <Link to="/auth" className='get-started-btn'>
        Get Started Free
      </Link>
      <div className="social-links">
        <span>Built by a Student Who Knows the Pressure.</span>
        <span className="contact">Contact Me !</span>
        <ul>
          <li><Link target="_blank" to={'https://www.linkedin.com/in/ali-mabrouki-8a7a46373'}><FaLinkedin /></Link></li>
          <li><Link target="_blank" to={'https://github.com/alimabrouki'}><FaGithub /></Link></li>
          <li><Link target="_blank" to={'https://x.com/Ali_develo'}><FaXTwitter /></Link></li>
        </ul>
      </div>
    </div>
  )
}