import '../styles/index.css'
import '../styles/Header.css'
import '../styles/SelectOptions.css'
import { useEffect, useRef, useState } from 'react'
import { User } from 'lucide-react';
export function SelectOptions({ schoolLevelOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(
    JSON.parse(localStorage.getItem('OPTION')) ?? 'Select Level'
  )
  const selectSchoolLevel = useRef(null)
  
  const selectedOption = useRef(null)

  useEffect(() => {
   localStorage.setItem('OPTION', JSON.stringify(selectedOpt)) 
  },[selectedOpt])

  const handleSlctSchlLvl = () => {
    if (isOpen) {
      setIsOpen(false)

    } else {
      setIsOpen(true)

    }
  }


  return (
    <div className="select-wrapper">
      <div onClick={handleSlctSchlLvl} className="select-options">
        
        <div className={isOpen && 'options-list' } ref={selectSchoolLevel}>
         {isOpen && (
           
          schoolLevelOptions.map((option) => {
            return (
              
              <span onClick={() => {
                
              setSelectedOpt(option.option)                
            
              }} key={option.id} ref={selectedOption} value={option.option}>{option.option}</span>
             
           
            )
          }) 
  )}
        
        </div> 
         <span>{selectedOpt}</span>
      </div>
      {/* <div className="select-wrapper">
        <select name="think-type" id="think-type" className='select think-type'>
          <span value="fast">Fast</span>
          <span value="thinker">Thinker</span>
        </select>
      </div>
      <div className="select-wrapper">
        <select name="language" id="language" className='select language'>
          <span value="tunisian">Tunisian</span>
          <span value="arabic">Arabic</span>
          <span value="english">English</span>
          <span value="french">French</span>
        </select>
      </div> */}
    </div>

  )
}