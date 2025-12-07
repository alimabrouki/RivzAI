import '../../styles/index.css'
import '../../styles/Header.css'
import '../../styles/SelectOptions.css'
import { useEffect,  useRef,  useState } from 'react'
export default function SelectLevel({schoolOptions,placeHolder,storageKey}) {
   const [isOpen, setIsOpen] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? placeHolder
  )
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selectedOpt))
  }, [selectedOpt,storageKey])
  
  const dropDown = useRef(null)
  useEffect(() => {
    document.addEventListener('mousedown',(e) => {
      if (dropDown.current && !dropDown.current.contains(e.target)) {
        setIsOpen(false)
      }
    })
  },[])

  return(
    <>
      <div onClick={() => {
        setIsOpen(!isOpen)
      }} className="select-options" ref={dropDown}>
        <div className={isOpen ? 'options-list' : 'options-list-hidden'}>
          {isOpen &&
            schoolOptions.map((option) => (
              <span
                onClick={() => {
                  setSelectedOpt(option.option);
                
                  console.log(option.option);
                }}
                key={option.id}
                value={option.option}
              className={`option ${selectedOpt === option.option ? 'selected-option' : ''}`}>
                {option.option}
              </span>
            ))}
        </div>
        <span>{selectedOpt}</span>
      </div>
      </>
  )
}