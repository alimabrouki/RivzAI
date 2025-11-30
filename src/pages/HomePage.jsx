import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import { Paperclip, Mic } from 'lucide-react'
import { Header } from '../components/Header'
import { useRef, useState } from 'react'


export function HomePage() {
  const [position, setPosition] = useState({x: 0, y: 0});
  const solveIt = useRef(null)
  const inputRef = useRef(null);
  const audioRef = useRef(null)
  function uploadFile() {
    inputRef.current.click();
  }

  function recordAudio() {
    audioRef.current.click();
  }

    const handleMouseMove = (e) => {
      if (!solveIt.current) return;
    

    const solveItBtn = solveIt.current;
    const rect = solveItBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const maxMove = 15;
    const strength = 0.3;
    
    setPosition({
      x: Math.max(-maxMove, Math.min(maxMove, deltaX * strength)),
      y: Math.max(-maxMove, Math.min(maxMove, deltaY * strength))
    });
  }
  const handleMouseLeave = () => {
    setPosition({x: 0, y: 0});
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
            <div className="prompt-box">
              <textarea name="" id="" className='prompt-input' placeholder='Put your homework here, and let’s break it down together...' />
              <div className="inputs">
                <input ref={inputRef} className='upload-file' type="file" name="homework-file" id="homework-file" accept="images/*,.pdf" />
                <button onClick={uploadFile}><Paperclip /></button>
              <input ref={audioRef} className='record-audio' type="file" name="audio-input" id="audio-input" accept="audio/*" capture="microphone" />
              <button onClick={recordAudio}><Mic /></button>
               <div className="submit-btn"><button className='solve-it' ref={solveIt} type="submit" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
                transform: `translate(${position.x}px, ${position.y}px)`
               }}>Solve It</button></div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>

  )
}