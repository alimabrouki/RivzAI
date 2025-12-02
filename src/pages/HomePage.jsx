import '../styles/index.css'
import '../styles/Header.css'
import '../styles/HomePage.css'
import { Header } from '../components/Header'
import { RecordAudio } from '../features/RecordAudio'
import { SolveItBtn } from '../features/SolveItBtn'
import { UploadFile } from '../features/UploadFile'


export const HomePage = () => {


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
                <div className="input-output">
                  <UploadFile />
                  <RecordAudio />
                </div>

                <div className="select-options">
                  <div className="select-wrapper">
                    <select name="school-level" id="school-level" className='select school-level'>
                      <option value="7eme">7eme</option>
                      <option value="8eme">8eme</option>
                      <option value="9eme">9eme</option>
                      <option value="1er">1ere</option>
                      <option value="2eme">2eme</option>
                      <option value="3eme">3eme</option>
                      <option value="bac">Bac</option>
                    </select>
                  </div>
                  <div className="select-wrapper">
                    <select name="think-type" id="think-type" className='select think-type'>
                      <option value="fast">Fast</option>
                      <option value="thinker">Thinker</option>
                    </select>
                  </div>
                  <div className="select-wrapper">
                    <select name="language" id="language" className='select language'>
                      <option value="tunisian">Tunisian</option>
                      <option value="arabic">Arabic</option>
                      <option value="english">English</option>
                      <option value="french">French</option>
                    </select>
                  </div>
                </div>
                <button type='button' className='multi-step-mode'>
                  Multi-Step Mode
                </button>
                <SolveItBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}