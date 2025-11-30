import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import { Header } from '../components/Header'


export function HomePage() {
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
    </div>
    </div>
   </div>
   </div>
    </>
   
  )
}