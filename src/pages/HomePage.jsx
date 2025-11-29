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
    <div className="prompt-box">
      
    </div>
    </div>
   </div>
   </div>
    </>
   
  )
}