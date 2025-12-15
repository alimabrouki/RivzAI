import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import { Header } from '../components/Header'
import { PromptBox } from './PromptBox'
import { useEffect, useState } from 'react'


export const HomePage = () => {
  const [addedHitsory, setAddedHistory] = useState(JSON.parse(localStorage.getItem('newPrompt')) ?? [])

  useEffect(() => {
    localStorage.setItem('newPrompt', JSON.stringify(addedHitsory))
  }, [addedHitsory])

  const handleAddHistory = (newPrompt) => {
    setAddedHistory((prevHistory => [newPrompt, ...prevHistory].slice(0, 3)));
  }
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
            <div className="recent-homework">
              <h2>Recent Homework</h2>
              {
                addedHitsory.map((history, index) => (
                  <span key={index} >{history}</span>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>

  )
}