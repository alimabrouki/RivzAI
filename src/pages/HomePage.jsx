import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import '../styles/hooks-styles/useIntersectionAnimation.css'
import { Header } from '../components/Header'
import { PromptBox } from './PromptBox'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useIntersectionAnimation } from '../hooks/useIntersectionAnimation'

export const HomePage = () => {
  const [addedHitsory, setAddedHistory] = useLocalStorage('newPrompt', [
    'Rewrite this paragraph simpler',
    'Translate to Arabic / French / English',
    'Summaries of lessons'
  ])

  const handleAddHistory = (newPrompt) => {
    setAddedHistory((prevHistory => [newPrompt, ...prevHistory].slice(0, 3)));
  }

  const observe = useIntersectionAnimation({threshold: 0.1})
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/src/assets/images/logo.png" />
      <title>RivzAI</title>
      <Header />

      <div className="home-page">
        <div className="wrapper">
          <div className="hero">
            <h1 className='hero-title'><span className='orange-hero-title'>Rivz</span> With <span className='orange-hero-title'>AI</span> Now!</h1>
            <h3 className='under-title'>
              RivzAI brings elite AI problem-solving straight to your homework <span className='orange-under-title'>Fast</span>, <span className="orange-under-title"> Precise</span>, <span className="orange-under-title"> Grade-boosting</span>
            </h3>
            <h3 className='under-title-two'>
              jibnelk a9wa AI agents bech irivz w ye5dem m3ak as3eb les exercices
            </h3>
            <PromptBox handleAddHistory={handleAddHistory} />
            <div ref={observe} className="recent-homework slide-in">
              <h2 ref={observe} className='slide-in'>Recent Homework</h2>
              {
                addedHitsory.map((history, index) => (
                  <Link ref={observe} key={index} to={'/history'} className='recent-prompt slide-in'><span className='slide-in' ref={observe} key={index} >{history}</span></Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>

  )
}